import { createContext, ReactNode, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleMode: () => {},
});

interface IThemeProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({ children }: IThemeProps) => {
  const savedTheme = localStorage.getItem("theme") ?? "light";
  const [theme, setTheme] = useState(savedTheme);
  const toggleMode = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
