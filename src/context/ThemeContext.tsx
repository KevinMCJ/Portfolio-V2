import { createContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";

const getPreferredTheme = (): Theme => {
  const savedTheme = localStorage.getItem("theme") as Theme | null;
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldUseDarkTheme = savedTheme === "dark" || (!localStorage.getItem("theme") && systemPrefersDark);
  return shouldUseDarkTheme ? "dark" : "light";
};

// * Avoid theme flash
(function () {
  document.documentElement.classList.add(getPreferredTheme());
})();

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getPreferredTheme());

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.replace(theme, newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
