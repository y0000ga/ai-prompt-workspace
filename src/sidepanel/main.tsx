import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@styles/global.css";
import "flatpickr/dist/flatpickr.min.css";
import App from "./App";
import TagProvider from "./context/tag/provider";
import PromptProvider from "./context/prompt/provider";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <TagProvider>
        <PromptProvider>
          <App />
        </PromptProvider>
      </TagProvider>
    </StrictMode>
  );
}
