import { useState } from "react";
import { Button } from "./ui/button";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "./ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
const NAV_ITEMS = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
];

const TOOLS_ITEMS = [
    { title: "Quotes", href: "/quotes", description: "Programming wisdom" },
    { title: "Colors", href: "/color-generator", description: "Color palette generator" },
    { title: "GitHub", href: "/github-stats", description: "Developer metrics" },
    { title: "Changelog", href: "/changelog", description: "Site updates" },
];

function HamburgerIcon(props: { className?: string }) {
    return (
        <svg
            className={props.className}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
    );
}

function CloseIcon(props: { className?: string }) {
    return (
        <svg
            className={props.className}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            <path d="M18 6L6 18M6 6l12 12" />
        </svg>
    );
}

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-[9999] w-full border-b border-primary/20 bg-background/95 backdrop-blur-sm terminal-window">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-3">
                        <a href="/" className="flex items-center space-x-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary text-background">
                                {/* Terminal prompt logo */}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <path d="M6 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </span>
                            <span className="font-semibold terminal-cursor">lwh</span>
                        </a>
                    </div>

                    {/* Center: nav as (desktop) */}
                    <nav className="hidden md:flex md:items-center md:space-x-4">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 px-3 py-2 rounded-md transition-all duration-200 "
                            >
                                {item.title}
                            </a>
                        ))}
                        
                        {/* Tools Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 px-3 py-2 h-auto"
                                >
                                    Tools
                                    <svg 
                                        className="ml-1 h-3 w-3" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="terminal-window">
                                {TOOLS_ITEMS.map((item) => (
                                    <DropdownMenuItem key={item.href} asChild>
                                        <a 
                                            href={item.href}
                                            className="flex flex-col items-start w-full font-mono"
                                        >
                                            <span className="font-medium">{item.title}</span>
                                            <span className="text-xs text-muted-foreground">{item.description}</span>
                                        </a>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>

                    {/* Right: actions */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        
                        {/* Mobile: sheet menu trigger */}
                        <div className="md:hidden">
                            <Sheet open={open} onOpenChange={setOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" aria-label="Open menu" className="hover:bg-primary/10 hover:border-primary/30">
                                        <HamburgerIcon />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="terminal-window">
                                    <SheetHeader>
                                        <div className="flex items-center justify-between">
                                            <SheetTitle className="text-primary">~/menu</SheetTitle>
                                            <SheetClose />
                                        </div>
                                    </SheetHeader>

                                    <div className="mt-4 flex flex-col space-y-2">
                                        {NAV_ITEMS.map((item) => (
                                            <a
                                                key={item.href}
                                                href={item.href}
                                                className="hover:cursor-pointer block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10  transition-all duration-200"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="text-primary">$</span> {item.title}
                                            </a>
                                        ))}
                                        
                                        {/* Tools Section */}
                                        <div className="border-t border-border pt-4 mt-4">
                                            <div className="px-3 py-1 text-sm font-medium text-muted-foreground">
                                                ~/tools
                                            </div>
                                            {TOOLS_ITEMS.map((item) => (
                                                <a
                                                    key={item.href}
                                                    href={item.href}
                                                    className="hover:cursor-pointer block px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/10 transition-all duration-200"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <div className="flex flex-col">
                                                        <span><span className="text-primary">$</span> {item.title}</span>
                                                        <span className="text-xs text-muted-foreground ml-3">{item.description}</span>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}