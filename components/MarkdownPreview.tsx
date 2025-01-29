import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownPreviewProps {
  markdown: string;
  className?: string;
}

export default function MarkdownPreview({
  markdown,
  className = "",
}: MarkdownPreviewProps) {
  const baseComponents = {
    h1: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: any;
    }) => (
      <h1 className="text-3xl font-bold mt-6 mb-4" {...props}>
        {children}
      </h1>
    ),
    h2: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: any;
    }) => (
      <h2 className="text-2xl font-bold mt-5 mb-3" {...props}>
        {children}
      </h2>
    ),
    h3: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: any;
    }) => (
      <h3 className="text-xl font-bold mt-4 mb-2" {...props}>
        {children}
      </h3>
    ),
    p: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: any;
    }) => (
      <p className={`mt-3 mb-3 ${className || ""}`} {...props}>
        {children}
      </p>
    ),
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: any;
    }) => (
      <div className={className || ""} {...props}>
        {children}
      </div>
    ),
    ul: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: any;
    }) => (
      <ul
        className={`list-disc list-inside mt-3 mb-3 ${className || ""}`}
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: any;
    }) => (
      <ol
        className={`list-decimal list-inside mt-3 mb-3 ${className || ""}`}
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: any;
    }) => (
      <li className={`mt-1 ${className || ""}`} {...props}>
        {children}
      </li>
    ),
    a: ({ href, children, className, ...props }) => (
      <a
        href={href}
        className={`text-blue-600 hover:underline ${className || ""}`}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ children, className, ...props }) => (
      <blockquote
        className={`border-l-4 border-gray-300 pl-4 italic my-4 ${
          className || ""
        }`}
        {...props}
      >
        {children}
      </blockquote>
    ),
    table: ({ children, className, ...props }) => (
      <table
        className={`border-collapse table-auto w-full my-4 ${className || ""}`}
        {...props}
      >
        {children}
      </table>
    ),
    th: ({ children, className, ...props }) => (
      <th
        className={`border px-4 py-2 bg-gray-100 ${className || ""}`}
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, className, ...props }) => (
      <td className={`border px-4 py-2 ${className || ""}`} {...props}>
        {children}
      </td>
    ),
    img: ({ src, alt, className, ...props }) => (
      <img
        src={src}
        alt={alt}
        className={`max-w-full h-auto my-4 ${className || ""}`}
        loading="lazy"
        {...props}
      />
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          className="rounded-md my-4"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code
          className={`bg-gray-100 rounded px-1 py-0.5 ${className || ""}`}
          {...props}
        >
          {children}
        </code>
      );
    },
    pre: ({ children, className, ...props }) => (
      <pre
        className={`overflow-auto p-4 rounded-md bg-gray-100 my-4 ${
          className || ""
        }`}
        {...props}
      >
        {children}
      </pre>
    ),
  };

  return (
    <div
      className={`w-full h-full min-h-[450px] p-4 border rounded-lg overflow-auto prose prose-sm max-w-none ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={baseComponents}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
