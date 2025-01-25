import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownPreviewProps {
  markdown: string;
}

export default function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  return (
    <div className="w-full h-full min-h-[300px] p-4 border rounded-lg overflow-auto prose prose-sm max-w-none bg-background text-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mt-4 mb-2" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold mt-3 mb-2" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-bold mt-2 mb-1" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-lg font-bold mt-2 mb-1" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="text-base font-bold mt-2 mb-1" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="text-sm font-bold mt-2 mb-1" {...props} />
          ),
          p: ({ node, ...props }) => <p className="mt-2 mb-2" {...props} />,
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside mt-2 mb-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside mt-2 mb-2" {...props} />
          ),
          li: ({ node, ...props }) => <li className="mt-1" {...props} />,
          a: ({ node, ...props }) => (
            <a className="text-blue-600 hover:underline" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-gray-300 pl-4 italic my-2"
              {...props}
            />
          ),
          table: ({ node, ...props }) => (
            <table
              className="border-collapse table-auto w-full my-4"
              {...props}
            />
          ),
          th: ({ node, ...props }) => (
            <th className="border px-4 py-2 bg-gray-100" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border px-4 py-2" {...props} />
          ),
          img: ({ node, ...props }) => (
            <img className="max-w-full h-auto my-4" {...props} />
          ),
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                style={tomorrow}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className="bg-muted rounded px-1 py-0.5" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
