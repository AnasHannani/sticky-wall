import { usePersistentState } from "./usePersistentState";

// Hook personnalisé pour gérer l'état des tags
export const useTagsState = () => {
  // Utilise un état persistant pour stocker les tags dans le localStorage
  const [tags, setTags] = usePersistentState("tags", []);

  // Fonction pour ajouter un nouveau tag
  const handleAddTag = (newTag) => {
    // Vérifie les doublons ?
    setTags((prevTags) => [...prevTags, { ...newTag, id: Date.now() }]);
  };

  // Fonction pour mettre à jour un tag existant
  const handleUpdateTag = (index, updatedTag) => {
    const updated = [...tags];
    updated[index] = updatedTag;
    setTags(updated);
  };
  const handleDeleteTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Fonction utilitaire pour basculer la sélection d'un tag dans le tableau des tags d'une note
  const toggleTagSelection = (tagId, selectedTagIds = []) => {
    const newSelectedTagIds = selectedTagIds.includes(tagId)
      ? selectedTagIds.filter((id) => id !== tagId) // Supprime le tag s'il est déjà sélectionné
      : [...selectedTagIds, tagId]; // Ajoute le tag s'il n'est pas encore sélectionné
    return newSelectedTagIds;
  };

  // Retourne les tags et les fonctions associées
  return {
    tags, // Liste des tags
    setTags, // Optionnel : exposer si une manipulation directe est nécessaire ailleurs
    handleAddTag, // Fonction pour ajouter un tag
    handleUpdateTag, // Fonction pour mettre à jour un tag
    handleDeleteTag, // Fonction pour supprimer un tag
    toggleTagSelection, // Fonction pour basculer la sélection d'un tag
  };
};
