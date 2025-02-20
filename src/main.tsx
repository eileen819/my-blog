// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "styles/reset.css";
import "./index.css";
import { AuthContextProvider } from "context/AuthContext.tsx";
import { ThemeContextProvider } from "context/\bThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ThemeContextProvider>
);
