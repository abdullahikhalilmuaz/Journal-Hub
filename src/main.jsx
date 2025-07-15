import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import i18next from "./i18n";
import { I18nextProvider } from "react-i18next";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </I18nextProvider>
  </StrictMode>
);
