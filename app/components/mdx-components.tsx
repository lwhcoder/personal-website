import type { ReactNode } from "react";
import { CodeBlock, MultiLanguageCode } from "./code-block";

interface MDXComponentProps {
  children?: ReactNode;
  href?: string;
  src?: string;
  alt?: string;
  className?: string;
  [key: string]: any;
}

function extractLanguageFromClassName(className?: string): string {
  if (!className) return "text";
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : "text";
}

export const mdxComponents = {
  h1: ({ children, ...props }: MDXComponentProps) => (
    <h1 className="mb-6 mt-8 text-4xl font-bold" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: MDXComponentProps) => (
    <h2 className="mb-4 mt-8 text-3xl font-bold" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: MDXComponentProps) => (
    <h3 className="mb-3 mt-6 text-2xl font-semibold" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: MDXComponentProps) => (
    <p className="mb-4 leading-7 text-muted-foreground" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }: MDXComponentProps) => (
    <a
      href={href}
      className="font-medium underline underline-offset-4 hover:text-primary"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }: MDXComponentProps) => (
    <ul className="mb-4 ml-6 list-disc space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: MDXComponentProps) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: MDXComponentProps) => (
    <li className="text-muted-foreground" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: MDXComponentProps) => (
    <blockquote
      className="my-6 border-l-4 border-primary/30 pl-6 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...props }: MDXComponentProps) => {
    const language = extractLanguageFromClassName(className);
    const isInline = !className;

    if (isInline) {
      return (
        <code
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
          {...props}
        >
          {children}
        </code>
      );
    }

    return <code className={className} {...props}>{children}</code>;
  },
  pre: ({ children, ...props }: MDXComponentProps) => {
    // Extract code content and language from children
    const childArray = Array.isArray(children) ? children : [children];
    const codeElement = childArray.find(
      (child: any) => child?.type === "code" || child?.props?.className
    );

    if (codeElement) {
      const codeProps = codeElement.props || {};
      const language = extractLanguageFromClassName(codeProps.className);
      const code = String(codeProps.children || children || "").trim();
      
      // Always use CodeBlock component for consistent styling and copy functionality
      return <CodeBlock code={code} language={language} />;
    }

    // Fallback for edge cases
    const code = String(children || "").trim();
    return <CodeBlock code={code} language="text" />;
  },
  img: ({ src, alt, ...props }: MDXComponentProps) => (
    <img
      src={src}
      alt={alt}
      className="my-6 rounded-lg border"
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-8 border-border" {...props} />,
  table: ({ children, ...props }: MDXComponentProps) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: MDXComponentProps) => (
    <th className="border border-border px-4 py-2 text-left font-semibold" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: MDXComponentProps) => (
    <td className="border border-border px-4 py-2 text-muted-foreground" {...props}>
      {children}
    </td>
  ),
  // Export custom components for use in MDX
  CodeBlock,
  MultiLanguageCode,
};
