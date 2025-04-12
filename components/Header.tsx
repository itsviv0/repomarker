import { Switch } from "./ui/switch";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-between items-center mb-4">
      <Link href="/" className="flex items-center">
        <Image
          width={200}
          height={40}
          src={theme === "dark" ? "/repomarker-light.png" : "/repomarker.png"}
          alt="logo"
          className="h-10"
        />
      </Link>
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
