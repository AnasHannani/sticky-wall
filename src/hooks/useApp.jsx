import { useContext } from "react";
import { AppContext } from "../contexts/AppContext"; // Ajuste le chemin si nécessaire

// Hook personnalisé pour accéder au contexte de l'application
export const useApp = () => {
  const context = useContext(AppContext); // Récupère le contexte via useContext
  if (context === undefined) {
    // Lève une erreur si le hook est utilisé en dehors d'un AppProvider
    throw new Error("useApp must be used within an AppProvider");
  }
  return context; // Retourne le contexte
};
