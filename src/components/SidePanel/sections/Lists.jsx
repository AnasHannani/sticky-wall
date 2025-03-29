import { useState, useEffect } from "react";
import SectionHeader from "./components/SectionHeader";
import { useApp } from "../../../data/DataContext";

const Lists = () => {
  const {
    lists, // Liste des éléments disponibles
    activeList, // Index de la liste actuellement active
    setActiveList, // Fonction pour définir la liste active
    setPageTitle, // Fonction pour définir le titre de la page
    handleAddList, // Fonction pour ajouter une nouvelle liste
    handleUpdateList, // Fonction pour mettre à jour une liste existante
    handleDeleteList, // Fonction pour supprimer une liste
    searchTerm, // Terme de recherche actuel
    handleSearch, // Fonction pour effectuer une recherche
    searchResults, // Résultats de la recherche
  } = useApp();

  // État local pour gérer l'interface utilisateur
  const [isEditing, setIsEditing] = useState(false); // Indique si l'utilisateur est en mode édition
  const [currentIndex, setCurrentIndex] = useState(null); // Index de l'élément en cours d'édition
  const [newName, setNewName] = useState(""); // Nom de la nouvelle liste ou de la liste mise à jour
  const [newColor, setNewColor] = useState("bg-blue-500"); // Couleur de la liste
  const [error, setError] = useState(""); // Message d'erreur à afficher

  // Ajouter un nouvel élément à la liste
  const handleAddItem = () => {
    if (!newName.trim()) {
      setError("Le nom de la liste ne peut pas être vide"); // Vérifie si le nom est vide
      return;
    }

    handleAddList({
      name: newName, // Nom de la nouvelle liste
      color: newColor, // Couleur de la nouvelle liste
    });

    // Réinitialise les champs après l'ajout
    setNewName("");
    setNewColor("bg-blue-500");
    setIsEditing(false);
    setError("");
  };

  // Commencer à éditer un élément existant
  const startEditing = (index) => {
    const listToEdit = lists[index]; // Récupère la liste à éditer

    setCurrentIndex(index); // Définit l'index de l'élément en cours d'édition
    setIsEditing(true); // Active le mode édition
    setNewName(listToEdit.name); // Pré-remplit le nom
    setNewColor(listToEdit.color); // Pré-remplit la couleur
    setError(""); // Réinitialise les erreurs
  };

  // Mettre à jour un élément existant
  const handleUpdateItem = () => {
    if (!newName.trim()) {
      setError("Le nom de la liste ne peut pas être vide"); // Vérifie si le nom est vide
      return;
    }

    handleUpdateList(currentIndex, {
      name: newName, // Nouveau nom
      color: newColor, // Nouvelle couleur
    });

    // Réinitialise les champs après la mise à jour
    setIsEditing(false);
    setNewName("");
    setNewColor("bg-blue-500");
    setCurrentIndex(null);
    setError("");
  };

  // Supprimer un élément de la liste
  const handleDelete = (index) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette liste ?")) {
      handleDeleteList(index); // Supprime l'élément si confirmé
    }
  };

  // Définir la liste active par ID
  const handleSetActiveList = (listId) => {
    const list = lists.find((list) => list.id === listId); // Trouve la liste par ID
    if (list) {
      const index = lists.findIndex((l) => l.id === listId); // Trouve l'index de la liste
      setActiveList(index); // Définit la liste active
      setPageTitle(list.name); // Met à jour le titre de la page
    }
  };

  // Annuler le mode édition
  const handleCancel = () => {
    setIsEditing(false); // Désactive le mode édition
    setNewName(""); // Réinitialise le nom
    setNewColor("bg-blue-500"); // Réinitialise la couleur
    setCurrentIndex(null); // Réinitialise l'index
    setError(""); // Réinitialise les erreurs
  };

  return (
    <div className="px-4 pb-2 pt-4">
      <SectionHeader title="Lists" /> {/* En-tête de la section */}
      {error && (
        <div className="mb-2 rounded bg-red-100 p-2 text-xs text-red-600">
          {error} {/* Affiche le message d'erreur */}
        </div>
      )}
      <ul className="space-y-1">
        {lists.map((item, index) => {
          return (
            <li
              key={item.id}
              className={`group flex h-10 items-center justify-between rounded-md p-2 cursor-pointer ${
                activeList === index ? "bg-gray-200" : "hover:bg-gray-200"
              }`}
              onClick={() => {
                handleSetActiveList(item.id); // Définit la liste active
                handleSearch(item.name); // Effectue une recherche
              }}
            >
              <div className="flex items-center">
                <span
                  className={`mr-2 h-2 w-2 rounded-full ${item.color}`}
                ></span>{" "}
                {/* Indicateur de couleur */}
                <span
                  className={`text-sm ${
                    activeList === index ? "font-semibold" : "font-normal"
                  }`}
                >
                  {item.name} {/* Nom de la liste */}
                </span>
              </div>

              <div className="flex items-center">
                <button
                  className="hidden text-gray-400 hover:text-gray-600 group-hover:inline-block ml-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Empêche la propagation de l'événement
                    startEditing(index); // Active le mode édition
                  }}
                >
                  {/* Icône d'édition */}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  className="hidden text-gray-400 hover:text-red-600 group-hover:inline-block ml-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Empêche la propagation de l'événement
                    handleDelete(index); // Supprime l'élément
                  }}
                >
                  {/* Icône de suppression */}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </li>
          );
        })}

        {isEditing ? (
          <li className="flex flex-col gap-2 rounded-md border border-dashed border-gray-300 p-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)} // Met à jour le nom
              className="w-full rounded-md border border-gray-300 p-1 text-sm"
              placeholder="Nom de la liste"
              onKeyDown={(e) =>
                e.key === "Enter" &&
                (currentIndex !== null ? handleUpdateItem() : handleAddItem())
              } // Ajoute ou met à jour la liste avec la touche Entrée
            />
            <div className="flex gap-2">
              {[
                "bg-red-500", // Rouge
                "bg-blue-500", // Bleu
                "bg-green-500", // Vert
                "bg-yellow-500", // Jaune
                "bg-purple-500", // Violet
                "bg-pink-500", // Rose
                "bg-orange-500", // Orange
              ].map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`h-4 w-4 rounded-full ${color} ${
                    newColor === color
                      ? "ring-2 ring-offset-1 ring-gray-400"
                      : ""
                  }`}
                  onClick={() => setNewColor(color)}
                />
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="rounded-md bg-gray-200 px-2 py-1 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={
                  currentIndex !== null ? handleUpdateItem : handleAddItem
                }
                className="rounded-md bg-blue-500 px-2 py-1 text-xs text-white"
              >
                {currentIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </li>
        ) : (
          <li
            className="flex h-10 items-center justify-between rounded-md border border-dashed border-gray-300 px-2 p-2 cursor-pointer text-gray-500 hover:bg-gray-200"
            onClick={() => setIsEditing(true)}
          >
            <div className="flex items-center">
              <span className="mr-2">+</span>
              <span className="text-sm font-normal">Add to list</span>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Lists;
