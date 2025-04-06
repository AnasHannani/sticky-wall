import { createContext, useContext } from "react";

// Importe tous les hooks personnalisés
import { useUIState } from "../hooks/useUIState";
import { useTasksState } from "../hooks/useTasksState";
import { useListsState } from "../hooks/useListsState";
import { useTagsState } from "../hooks/useTagsState";
import { useNotesState } from "../hooks/useNotesState";
import { useSearchState } from "../hooks/useSearchState";

// 1. Crée le contexte
const AppContext = createContext(undefined);

// 2. Crée le composant Provider
export const AppProvider = ({ children }) => {
  // Appelle les hooks pour obtenir les états et fonctions associés
  const uiState = useUIState("Sticky Wall"); // Passe un titre initial si nécessaire
  const tasksState = useTasksState(3); // Passe l'index initial de la tâche active
  const listsState = useListsState();
  const tagsState = useTagsState();
  const notesState = useNotesState();

  // Le hook de recherche a besoin d'accéder aux données des autres hooks
  const searchState = useSearchState(
    tasksState.tasks, // Passe les tâches
    listsState.lists, // Passe les listes
    tagsState.tags, // Passe les tags
    notesState.notes // Passe les notes
  );

  // Combine toutes les valeurs dans un seul objet de contexte
  // Remarque : Assurez-vous que `handleDeleteList` dans `useListsState` peut mettre à jour `pageTitle` si nécessaire,
  // peut-être en passant `uiState.setPageTitle` dans `useListsState` ou en le gérant dans le composant utilisant le contexte.
  // Pour l'instant, on garde cela simple.
  const contextValue = {
    ...uiState, // Ajoute l'état de l'interface utilisateur
    ...tasksState, // Ajoute l'état des tâches
    ...listsState, // Ajoute l'état des listes
    ...tagsState, // Ajoute l'état des tags
    ...notesState, // Ajoute l'état des notes
    ...searchState, // Ajoute l'état de la recherche
    // Ajoute explicitement des fonctions renommées/ajustées si nécessaire
    toggleTag: tagsState.toggleTagSelection, // Exemple si le nom a changé
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// 3. Exporte le contexte lui-même (optionnel, si nécessaire directement)
export { AppContext };
