// sticky-wall/src/hooks/useSearchState.js
import { useState } from "react";

// Hook personnalisé pour gérer l'état de la recherche
export const useSearchState = (
  tasks = [],
  lists = [],
  tags = [],
  notes = []
) => {
  // État pour stocker le terme de recherche
  const [searchTerm, setSearchTerm] = useState("");

  // État pour stocker les résultats de la recherche
  const [searchResults, setSearchResults] = useState({
    tasks: [], // Résultats pour les tâches
    lists: [], // Résultats pour les listes
    tags: [], // Résultats pour les tags
    notes: [], // Résultats pour les notes
  });

  // Fonction pour effectuer une recherche
  const handleSearch = (term) => {
    setSearchTerm(term); // Met à jour le terme de recherche

    // Si le terme est vide ou contient uniquement des espaces, réinitialise la recherche
    if (!term.trim()) {
      clearSearch(); // Utilise la fonction clearSearch
      return;
    }

    const lowerTerm = term.toLowerCase(); // Convertit le terme en minuscule pour une recherche insensible à la casse

    // Recherche dans les tâches (utilise le tableau 'tasks' passé en argument)
    const filteredTasks = tasks.filter((task) =>
      task.name.toLowerCase().includes(lowerTerm)
    );

    // Recherche dans les listes (utilise le tableau 'lists' passé en argument)
    const filteredLists = lists.filter((list) =>
      list.name.toLowerCase().includes(lowerTerm)
    );

    // Recherche dans les tags (utilise le tableau 'tags' passé en argument)
    const filteredTags = tags.filter((tag) =>
      tag.name.toLowerCase().includes(lowerTerm)
    );

    // Recherche dans les notes (utilise les tableaux 'notes', 'tags' et 'lists' passés en arguments)
    const filteredNotes = notes.filter((note) => {
      const titleMatch = note.title?.toLowerCase().includes(lowerTerm); // Vérifie si le titre correspond
      let contentMatch = false;

      // Vérifie si le contenu correspond (chaîne ou tableau de chaînes)
      if (typeof note.content === "string") {
        contentMatch = note.content.toLowerCase().includes(lowerTerm);
      } else if (Array.isArray(note.content)) {
        contentMatch = note.content.some(
          (item) =>
            typeof item === "string" && item.toLowerCase().includes(lowerTerm)
        );
      }

      // Vérifie si un tag associé correspond
      const tagMatch = note.tags?.some((tagId) => {
        const tag = tags.find((t) => t.id === tagId);
        return tag?.name.toLowerCase().includes(lowerTerm);
      });

      // Vérifie si une liste associée correspond
      const listMatch = lists.some((list) => {
        const noteListId = String(note.listId); // Assure que les comparaisons fonctionnent même si les types diffèrent
        const currentListId = String(list.id);
        return (
          noteListId === currentListId &&
          list.name.toLowerCase().includes(lowerTerm)
        );
      });

      // Retourne true si l'une des correspondances est trouvée
      return titleMatch || contentMatch || tagMatch || listMatch;
    });

    // Met à jour les résultats de la recherche
    setSearchResults({
      tasks: filteredTasks,
      lists: filteredLists,
      tags: filteredTags,
      notes: filteredNotes,
    });
  };

  // Fonction pour réinitialiser la recherche
  const clearSearch = () => {
    setSearchTerm(""); // Réinitialise le terme de recherche
    setSearchResults({ tasks: [], lists: [], tags: [], notes: [] }); // Vide les résultats
  };

  // Retourne les états et les fonctions associées
  return {
    searchTerm, // Terme de recherche actuel
    searchResults, // Résultats de la recherche
    handleSearch, // Fonction pour effectuer une recherche
    clearSearch, // Fonction pour réinitialiser la recherche
  };
};
