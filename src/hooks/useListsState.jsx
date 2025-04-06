import { useState } from "react";
import { usePersistentState } from "./usePersistentState";

// Hook personnalisé pour gérer l'état des listes
export const useListsState = () => {
  // Utilise un état persistant pour stocker les listes dans le localStorage
  const [lists, setLists] = usePersistentState("lists", []);

  // État pour suivre la liste active (peut être un ID ou un index)
  const [activeList, setActiveList] = useState(null);

  // Fonction pour ajouter une nouvelle liste
  const handleAddList = (newList) => {
    // Assure un ID unique (utiliser une bibliothèque comme UUID pour des IDs plus robustes)
    setLists((prevLists) => [...prevLists, { ...newList, id: Date.now() }]);
  };

  // Fonction pour mettre à jour une liste existante
  const handleUpdateList = (index, updatedItem) => {
    const updated = [...lists];
    updated[index] = updatedItem;
    setLists(updated);
  };

  // Fonction pour supprimer une liste
  const handleDeleteList = (index) => {
    setLists(lists.filter((_, i) => i !== index));
    if (activeList === index) {
      setActiveList(null);
      setPageTitle("");
    }
  };

  // Fonction pour obtenir le nom d'une liste par son ID
  const getListNameById = (listId) => {
    const list = lists.find((l) => l.id === listId);
    return list?.name || "Aucune liste";
  };

  // Retourne les états et les fonctions associées
  return {
    lists, // Liste des listes
    setLists, // Optionnel : exposer si une manipulation directe est nécessaire ailleurs
    activeList, // Liste actuellement active
    setActiveList, // Fonction pour changer la liste active
    handleAddList, // Fonction pour ajouter une liste
    handleUpdateList, // Fonction pour mettre à jour une liste
    handleDeleteList, // Fonction pour supprimer une liste
    getListNameById, // Fonction pour obtenir le nom d'une liste par ID
  };
};
