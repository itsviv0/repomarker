"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import LoadingScreen from "@/components/LoadingScreen";
import MarkdownEditor from "@/components/MarkdownEditor";
import MarkdownPreview from "@/components/MarkdownPreview";
import Toolbar from "@/components/Toolbar";
import Header from "@/components/Header";

export default function Home() {
  const [markdown, setMarkdown] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedMarkdown = localStorage.getItem("markdown");
    if (savedMarkdown) {
      setMarkdown(savedMarkdown);
    }
    setTimeout(() => setIsLoading(false), 750);
  }, []);

  const handleMarkdownChange = (value: string) => {
    setMarkdown(value);
    localStorage.setItem("markdown", value);
  };

  const handleFormatting = (format: string) => {
    const textarea = document.querySelector("textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);

    let formattedText = "";
    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "unordered-list":
        formattedText = selectedText
          .split("\n")
          .map((line) => `- ${line}`)
          .join("\n");
        break;
      case "ordered-list":
        formattedText = selectedText
          .split("\n")
          .map((line, index) => `${index + 1}. ${line}`)
          .join("\n");
        break;
      case "quote":
        formattedText = `> ${selectedText}`;
        break;
      case "code":
        formattedText = `\`\`\`\n${selectedText}\n\`\`\``;
        break;
      default:
        formattedText = selectedText;
    }

    const newMarkdown =
      markdown.substring(0, start) + formattedText + markdown.substring(end);
    setMarkdown(newMarkdown);
    localStorage.setItem("markdown", newMarkdown);
  };

  const handleImageUpload = (imageUrl: string) => {
    const imageMarkdown = `![Alt text](${imageUrl})`;
    setMarkdown((prevMarkdown) => prevMarkdown + "\n" + imageMarkdown);
    localStorage.setItem("markdown", markdown + "\n" + imageMarkdown);
  };

  const handleLinkInsertion = (url: string, text: string) => {
    const linkMarkdown = `[${text}](${url})`;
    setMarkdown((prevMarkdown) => prevMarkdown + " " + linkMarkdown);
    localStorage.setItem("markdown", markdown + " " + linkMarkdown);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
  };

  const handleClear = () => {
    setMarkdown("");
    localStorage.removeItem("markdown");
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "markdown.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleInsertTable = () => {
    const tableMarkdown = `
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
`;
    setMarkdown((prevMarkdown) => prevMarkdown + tableMarkdown);
    localStorage.setItem("markdown", markdown + tableMarkdown);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="container mx-auto p-4 min-h-screen bg-background text-foreground">
        <Header />
        <Toolbar
          onFormat={handleFormatting}
          onImageUpload={handleImageUpload}
          onLinkInsertion={handleLinkInsertion}
          onCopy={handleCopy}
          onClear={handleClear}
          onDownload={handleDownload}
          onInsertTable={handleInsertTable}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MarkdownEditor value={markdown} onChange={handleMarkdownChange} />
          <MarkdownPreview markdown={markdown} />
        </div>
      </div>
    </ThemeProvider>
  );
}
