import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mb-0 sm:mt-12 py-4 sm:py-6 border-t dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-2 sm:space-x-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
        <a href="/">
          <img src="/branding.svg" alt="Branding RepoMarker" className="w-5" />
        </a>
        <span className="text-base fonxxt-medium">|</span>
        <span className="text-base font-medium">Made by</span>
        <a
          href="https://github.com/itsviv0"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          <Github className="w-4 h-4 mr-1" />
          itsviv0
        </a>
      </div>
    </footer>
  );
}
