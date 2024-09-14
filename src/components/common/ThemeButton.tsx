import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeButton = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkTheme = localStorage.getItem("theme") === "dark";
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDarkTheme = isDarkTheme || (!localStorage.getItem("theme") && isSystemDark);

    if (shouldUseDarkTheme) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="focus:ring-primary center fixed bottom-4 right-4 size-12 rounded-full bg-secondary-600 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 md:size-14"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <FaSun className="size-[50%]" aria-hidden="true" />
      ) : (
        <FaMoon className="size-[50%]" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeButton;
