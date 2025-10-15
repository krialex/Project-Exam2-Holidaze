import { Sun, Moon } from "lucide-react";

type ThemeToggleProps = {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ThemeToggle({ darkMode, setDarkMode }: ThemeToggleProps) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle theme"
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 transition"
    >
      {darkMode ? <Sun size={23} className="text-yellow-400" /> : <Moon size={23} className="text-white dark:text-gray-100" />}
    </button>
  );
}

