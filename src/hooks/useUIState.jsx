import { useState } from "react";

// Hook personnalisé pour gérer l'état de l'interface utilisateur
export const useUIState = (initialTitle = "Sticky Wall") => {
  // État pour savoir si le menu est ouvert ou fermé
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  // État pour le titre de la page
  const [pageTitle, setPageTitle] = useState(initialTitle);

  // Fonction pour basculer l'état du menu (ouvert/fermé)
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Retourne les états et les fonctions associées
  return {
    isMenuOpen, // Indique si le menu est ouvert
    toggleMenu, // Permet de basculer l'état du menu
    pageTitle, // Titre actuel de la page
    setPageTitle, // Permet de mettre à jour le titre de la page
  };
};
