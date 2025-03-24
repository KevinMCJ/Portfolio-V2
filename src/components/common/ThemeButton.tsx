import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="focus:ring-primary center bg-secondary-600 fixed right-4 bottom-4 size-12 cursor-pointer rounded-full text-white transition-colors duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-hidden md:size-14"
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
