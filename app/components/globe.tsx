"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import createGlobe from "cobe"

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const { theme, resolvedTheme } = useTheme()
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    let phi = rotation
    let width = 0
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener("resize", onResize)
    onResize()

    const currentTheme = resolvedTheme || theme
    const isDark = currentTheme === "dark"

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: isDark ? 1 : 0,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: isDark ? 1.2 : 6,
      baseColor: isDark ? [0.3, 0.3, 0.3] : [0.8, 0.8, 0.8],
      markerColor: isDark ? [0.1, 0.8, 1] : [1, 0.5, 0.5],
      glowColor: [0,0,0],
      markers: [
      ],
      onRender: (state) => {
        // If not dragging, auto-rotate
        if (!pointerInteracting.current) {
          phi += 0.005
        }
        state.phi = phi + pointerInteractionMovement.current
        state.width = width * 2
        state.height = width * 2
      },
    })

    setTimeout(() => canvasRef.current && (canvasRef.current.style.opacity = "1"))
    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [theme, resolvedTheme, rotation])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const onPointerDown = (e: PointerEvent) => {
      pointerInteracting.current = e.clientX - pointerInteractionMovement.current
      canvas.style.cursor = "grabbing"
    }

    const onPointerUp = () => {
      pointerInteracting.current = null
      canvas.style.cursor = "grab"
      setRotation(rotation + pointerInteractionMovement.current)
      pointerInteractionMovement.current = 0
    }

    const onPointerOut = () => {
      pointerInteracting.current = null
      canvas.style.cursor = "grab"
      setRotation(rotation + pointerInteractionMovement.current)
      pointerInteractionMovement.current = 0
    }

    const onPointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        const delta = e.clientX - pointerInteracting.current
        pointerInteractionMovement.current = delta
      }
    }

    canvas.addEventListener("pointerdown", onPointerDown)
    canvas.addEventListener("pointerup", onPointerUp)
    canvas.addEventListener("pointerout", onPointerOut)
    canvas.addEventListener("pointermove", onPointerMove)

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown)
      canvas.removeEventListener("pointerup", onPointerUp)
      canvas.removeEventListener("pointerout", onPointerOut)
      canvas.removeEventListener("pointermove", onPointerMove)
    }
  }, [rotation])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "auto",
        maxWidth: "600px",
        aspectRatio: "1",
        opacity: 0,
        transition: "opacity 1s ease",
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
      }}
    />
  )
}
