import { useTheme } from "next-themes";

export default function LoadingScreen() {
  const { theme } = useTheme();
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      <img
        src={theme === "dark" ? "/repomarker-light.png" : "/repomarker.png"}
        alt="logo"
        className="mt-4 h-10"
      />
    </div>
  );
}
