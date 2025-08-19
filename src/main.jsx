import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // ⚠️ Charge Tailwind

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Élément #root introuvable dans index.html");
}

createRoot(rootEl).render(<App />);

// Petit log utile si tu avais un écran blanc
console.log("React monté ✅");