import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@styles/global.css";
import "flatpickr/dist/flatpickr.min.css";
import App from "./App";
import { StatusOptionsProvider } from "./context/statusOption/provider";
import NoteProvider from "./context/note/provider";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <StatusOptionsProvider>
        <NoteProvider>
          <App />
        </NoteProvider>
      </StatusOptionsProvider>
    </StrictMode>
  );
}
