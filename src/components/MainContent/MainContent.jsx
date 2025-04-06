// Import des dépendances React et des composants nécessaires
import { useState } from "react";
import { useApp } from "../../hooks/useApp";
import NoteModal from "./NoteModal";
import ContentHeader from "./ContentHeader";
import NoteGrid from "./NoteGrid";

function MainContent({ pageTitle }) {
  // Récupération des données et fonctions depuis le contexte d'application
  const {
    notes,               // Liste complète des notes
    searchTerm,          // Terme de recherche actuel
    activeList,          // Liste active (filtrage)
    searchResults,       // Résultats de recherche
    handleAddNote,       // Fonction pour ajouter une note
    handleEditNote,      // Fonction pour éditer une note
    handleDeleteNote,    // Fonction pour supprimer une note
  } = useApp();

  // Détermination des notes à afficher selon le contexte
  const displayedNotes = searchTerm
    ? searchResults.notes  // Si recherche active: affiche les résultats
    : activeList
    ? searchResults.notes  // Si filtre actif: affiche les notes filtrées
    : notes;               // Sinon: affiche toutes les notes

  // États locaux pour la gestion de la modale
  const [isModalOpen, setIsModalOpen] = useState(false);   // Ouverture/fermeture modale
  const [editingNote, setEditingNote] = useState(null);    // Note en cours d'édition

  // Gestion de la sauvegarde d'une note
  const handleSaveNote = (noteData) => {
    if (editingNote) {
      // Mode édition: mise à jour de la note existante
      handleEditNote(editingNote.id, noteData);
    } else {
      // Mode création: ajout d'une nouvelle note
      handleAddNote(noteData);
    }
    // Fermeture de la modale après sauvegarde
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      {/* En-tête du contenu avec le titre de la page */}
      <ContentHeader title={pageTitle} />

      {/* Grille de notes avec les fonctionnalités principales */}
      <NoteGrid
        notes={displayedNotes}          // Notes à afficher
        onEditNote={(note) => {         // Gestion de l'édition
          setEditingNote(note);         // Définit la note à éditer
          setIsModalOpen(true);         // Ouvre la modale
        }}
        onDeleteNote={handleDeleteNote} // Gestion de la suppression
        handleAddNote={() => {          // Gestion de l'ajout
          setEditingNote(null);         // Réinitialise l'édition
          setIsModalOpen(true);         // Ouvre la modale
        }}
        isSearching={!!searchTerm}      // Indicateur de recherche active
      />

      {/* Modale pour créer/éditer une note */}
      <NoteModal
        isOpen={isModalOpen}            // Contrôle l'affichage de la modale
        onClose={() => setIsModalOpen(false)}  // Gestion de la fermeture
        note={editingNote}              // Note à éditer (null pour création)
        onSave={handleSaveNote}         // Gestion de la sauvegarde
      />
    </div>
  );
}

export default MainContent;