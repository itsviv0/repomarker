import { Switch } from "./ui/switch";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold pt-4">RepoMarker - Markdown Editor</h1>
      <div className="flex items-center space-x-2">
        <Sun className="h-4 w-4" />
        <Switch
          checked={theme === "dark"}
          onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        <Moon className="h-4 w-4" />
      </div>
    </div>
  );
}
