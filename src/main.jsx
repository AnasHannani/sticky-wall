import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home.jsx";
import "./assets/index.css";
import { AppProvider } from './contexts/AppContext';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <Home />
    </AppProvider>
  </StrictMode>
);
