import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="focus:ring-primary center fixed bottom-4 right-4 size-12 rounded-full bg-secondary-600 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 md:size-14"
      aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkTheme ? (
        <FaSun className="size-[50%]" aria-hidden="true" />
      ) : (
        <FaMoon className="size-[50%]" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeButton;
