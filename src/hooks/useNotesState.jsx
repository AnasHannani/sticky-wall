import { usePersistentState } from "./usePersistentState";

// Configuration des notes (peut être déplacée dans un fichier de constantes séparé)
const NOTE_COLORS = [
  "bg-yellow-200",
  "bg-red-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-purple-200",
];
const DEFAULT_NOTE_COLOR = "bg-yellow-200";

// Hook personnalisé pour gérer l'état des notes
export const useNotesState = () => {
  // Utilise un état persistant pour stocker les notes dans le localStorage
  const [notes, setNotes] = usePersistentState("notes", []);

  // Liste des couleurs disponibles pour les notes
  const noteColors = NOTE_COLORS;

  // Fonction pour obtenir la couleur par défaut d'une note
  const getDefaultNoteColor = () => DEFAULT_NOTE_COLOR;

  // Fonction pour obtenir une note vide avec des valeurs par défaut
  const getEmptyNote = () => ({
    title: "", // Titre par défaut
    content: "", // Contenu par défaut
    color: getDefaultNoteColor(), // Couleur par défaut
    listId: null, // Aucun ID de liste par défaut
    tags: [], // Tableau vide pour les IDs de tags
    createdAt: new Date().toISOString(), // Date de création
    updatedAt: new Date().toISOString(), // Date de mise à jour
  });

  // Fonction pour ajouter une nouvelle note
  const handleAddNote = (newNoteData) => {
    const note = {
      ...getEmptyNote(), // Commence avec les valeurs par défaut
      ...newNoteData, // Remplace avec les données fournies
      id: Date.now(), // Assigne un ID unique
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prevNotes) => [...prevNotes, note]); // Ajoute la nouvelle note à la liste
    return note; // Retourne la note nouvellement créée avec son ID
  };

  // Fonction pour modifier une note existante
  const handleEditNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id
          ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() } // Met à jour la note
          : note
      )
    );
  };

  // Fonction pour supprimer une note
  const handleDeleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId)); // Supprime la note par ID
  };

  // Retourne les notes et les fonctions associées
  return {
    notes, // Liste des notes
    setNotes, // Optionnel : exposer si une manipulation directe est nécessaire ailleurs
    noteColors, // Liste des couleurs disponibles pour les notes
    getDefaultNoteColor, // Fonction pour obtenir la couleur par défaut
    getEmptyNote, // Fonction pour obtenir une note vide
    handleAddNote, // Fonction pour ajouter une note
    handleEditNote, // Fonction pour modifier une note
    handleDeleteNote, // Fonction pour supprimer une note
  };
};
