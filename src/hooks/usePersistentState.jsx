import { useState, useEffect } from "react";

// Fonction pour charger une valeur depuis le localStorage
const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key); // Récupère la valeur associée à la clé
    return saved ? JSON.parse(saved) : defaultValue; // Retourne la valeur parsée ou la valeur par défaut
  } catch (error) {
    console.error(
      `Erreur lors du chargement de ${key} depuis le localStorage :`,
      error
    );
    return defaultValue; // Retourne la valeur par défaut en cas d'erreur
  }
};

// Fonction pour sauvegarder une valeur dans le localStorage
const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value)); // Sauvegarde la valeur sous forme de chaîne JSON
  } catch (error) {
    console.error(
      `Erreur lors de la sauvegarde de ${key} dans le localStorage :`,
      error
    );
  }
};

// Hook personnalisé pour gérer un état persistant avec le localStorage
export const usePersistentState = (key, defaultValue = []) => {
  // Initialise l'état avec la valeur chargée depuis le localStorage
  const [state, setState] = useState(() =>
    loadFromLocalStorage(key, defaultValue)
  );

  // Effet pour sauvegarder l'état dans le localStorage à chaque mise à jour
  useEffect(() => {
    saveToLocalStorage(key, state);
  }, [key, state]);

  // Retourne l'état et la fonction pour le mettre à jour
  return [state, setState];
};
