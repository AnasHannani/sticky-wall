// Import des dépendances React et du contexte
import { useState, useEffect } from "react";
import { useApp } from "../../hooks/useApp";

function NoteModal({ isOpen, onClose, note = null, onSave }) {
  // Récupération des données et fonctions depuis le contexte
  const { 
    tags,               // Liste des tags disponibles
    lists,              // Liste des listes disponibles
    noteColors,         // Couleurs disponibles pour les notes
    getEmptyNote,       // Fonction pour obtenir une note vide
    toggleTag,          // Fonction pour basculer un tag
    handleAddNote,      // Fonction pour ajouter une note
    handleEditNote      // Fonction pour éditer une note
  } = useApp();
  
  // État local du formulaire
  const [formState, setFormState] = useState(getEmptyNote());

  // Effet pour initialiser le formulaire quand la note ou l'état d'ouverture change
  useEffect(() => {
    if (note) {
      // Mode édition : pré-remplir avec la note existante
      setFormState({
        ...note,
        // Conversion du contenu (array) en string avec sauts de ligne
        content: Array.isArray(note.content) 
          ? note.content.join("\n") 
          : note.content || ""
      });
    } else {
      // Mode création : initialiser avec une note vide
      setFormState({
        ...getEmptyNote(),
        // Sélection automatique de la première liste si disponible
        listId: lists[0]?.id || null
      });
    }
  }, [note, isOpen, lists, getEmptyNote]);

  // Gestionnaire générique des changements de champ
  const handleChange = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Préparation de la note avant sauvegarde
    const processedNote = {
      ...formState,
      // Conversion du contenu (string) en tableau en supprimant les lignes vides
      content: formState.content.split("\n").filter(line => line.trim() !== ""),
      // Mise à jour de la date de modification
      updatedAt: new Date().toISOString()
    };
    
    // Appel à la fonction appropriée selon le mode (édition/création)
    if (note) {
      handleEditNote(processedNote);
    } else {
      handleAddNote(processedNote);
    }
    
    // Fermeture de la modale
    onClose();
  };

  // Si la modale n'est pas ouverte, ne rien rendre
  if (!isOpen) return null;

  // Rendu de la modale
  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center p-4 z-50">
      {/* Conteneur principal de la modale */}
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Titre de la modale (change selon le mode) */}
        <h2 className="text-xl font-bold mb-4">
          {note ? "Edit Note" : "Add New Note"}
        </h2>

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          {/* Champ Titre */}
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1 font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={formState.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              required  // Champ obligatoire
            />
          </div>

          {/* Champ Contenu */}
          <div className="mb-4">
            <label htmlFor="content" className="block mb-1 font-medium">
              Content (one line per item)
            </label>
            <textarea
              id="content"
              value={formState.content}
              onChange={(e) => handleChange('content', e.target.value)}
              className="w-full border border-gray-300 rounded p-2 min-h-32"
              required  // Champ obligatoire
            />
          </div>

          {/* Sélecteur de couleur */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Color</label>
            <div className="flex gap-2">
              {noteColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full ${color} ${
                    // Mise en évidence de la couleur sélectionnée
                    formState.color === color ? "ring-2 ring-offset-2 ring-gray-800" : ""
                  }`}
                  onClick={() => handleChange('color', color)}
                />
              ))}
            </div>
          </div>

          {/* Sélecteur de liste (si des listes existent) */}
          {lists.length > 0 && (
            <div className="mb-4">
              <label htmlFor="list" className="block mb-1 font-medium">
                List
              </label>
              <select
                id="list"
                value={formState.listId || ""}
                onChange={(e) => handleChange('listId', e.target.value || null)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">None</option>
                {lists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sélecteur de tags (si des tags existent) */}
          {tags.length > 0 && (
            <div className="mb-4">
              <label className="block mb-1 font-medium">Tags</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    className={`py-1 px-2 rounded text-sm ${
                      // Style différent pour les tags sélectionnés
                      formState.tags.includes(tag.id) ? "bg-gray-100 text-gray-800" : ""
                    }`}
                    // Style dynamique basé sur la couleur du tag
                    style={!formState.tags.includes(tag.id) ? { 
                      backgroundColor: `var(--color-${tag.color}-100)`,
                      color: `var(--color-${tag.color}-800)`
                    } : {}}
                    onClick={() => handleChange(
                      'tags', 
                      toggleTag(tag.id, formState.tags)
                    )}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {note ? "Update" : "Add"}  {/* Texte dynamique selon le mode */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal;