import React from "react";
import { createRoot } from "react-dom/client";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./estilo.css";
import App from "./App.jsx";

createRoot(document.getElementById("raiz")).render(<App />);
