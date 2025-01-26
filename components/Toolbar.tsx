import { useState } from "react";
import {
  Bold,
  Italic,
  Link,
  Image,
  Copy,
  Check,
  List,
  ListOrdered,
  Quote,
  Code,
  Trash2,
  Download,
  Table,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ToolbarProps {
  onFormat: (format: string) => void;
  onImageUpload: (imageUrl: string) => void;
  onLinkInsertion: (url: string, text: string) => void;
  onCopy: () => void;
  onClear: () => void;
  onDownload: () => void;
  onInsertTable: () => void;
  markdown: string;
}

export default function Toolbar({
  onFormat,
  onImageUpload,
  onLinkInsertion,
  onCopy,
  onClear,
  onDownload,
  onInsertTable,
  markdown,
}: ToolbarProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleImageUpload = () => {
    onImageUpload(imageUrl);
    setImageUrl("");
  };

  const handleLinkInsertion = () => {
    onLinkInsertion(linkUrl, linkText);
    setLinkUrl("");
    setLinkText("");
  };

  const handleCopy = () => {
    onCopy();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex-wrap pb-4 gap-2 space-x-2">
        <Button onClick={() => onFormat("bold")} variant="outline" size="icon">
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => onFormat("italic")}
          variant="outline"
          size="icon"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => onFormat("unordered-list")}
          variant="outline"
          size="icon"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => onFormat("ordered-list")}
          variant="outline"
          size="icon"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button onClick={() => onFormat("quote")} variant="outline" size="icon">
          <Quote className="h-4 w-4" />
        </Button>
        <Button onClick={() => onFormat("code")} variant="outline" size="icon">
          <Code className="h-4 w-4" />
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Image className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insert Image</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleImageUpload}>Insert Image</Button>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Link className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insert Link</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="linkUrl" className="text-right">
                  URL
                </Label>
                <Input
                  id="linkUrl"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="linkText" className="text-right">
                  Text
                </Label>
                <Input
                  id="linkText"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleLinkInsertion}>Insert Link</Button>
          </DialogContent>
        </Dialog>
        <Button onClick={onInsertTable} variant="outline" size="icon">
          <Table className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-wrap pb-4 gap-2 space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              onClick={handleCopy}
              variant="outline"
              size="icon"
              disabled={!markdown}
            >
              {isCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40">
            <p className="text-sm font-medium text-center">
              {isCopied ? "Copied!" : "Copy to clipboard"}
            </p>
          </PopoverContent>
        </Popover>
        <Button
          onClick={onClear}
          variant="outline"
          size="icon"
          disabled={!markdown}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button
          onClick={onDownload}
          variant="outline"
          size="icon"
          disabled={!markdown}
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
