import { useTheme } from "next-themes";
import Image from "next/image";

export default function LoadingScreen() {
  const { theme } = useTheme();
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      <Image
        height={40}
        width={200}
        src={theme === "dark" ? "/repomarker-light.png" : "/repomarker.png"}
        alt="logo"
        className="mt-4 h-10"
      />
    </div>
  );
}
