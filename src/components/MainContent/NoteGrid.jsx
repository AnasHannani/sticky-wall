// Import des composants enfants nécessaires
import NoteCard from "./NoteCard";    // Composant pour l'affichage d'une note individuelle
import AddButton from "./AddButton";  // Composant pour le bouton d'ajout de note

// Définition du composant NoteGrid avec ses props
function NoteGrid({ 
  notes,          // Tableau des notes à afficher
  onEditNote,     // Fonction appelée lors de l'édition d'une note
  onDeleteNote,   // Fonction appelée lors de la suppression d'une note
  handleAddNote,  // Fonction appelée lors de l'ajout d'une nouvelle note
  isSearching     // Booléen indiquant si une recherche est en cours
}) {
  return (
    <div className="space-y-4">
      {/* Message indiquant le nombre de notes correspondantes lors d'une recherche */}
      {isSearching && (
        <div className="text-sm text-gray-500 px-2">
          Showing {notes.length} matching notes
        </div>
      )}
      
      {/* Grille responsive des notes avec le bouton d'ajout */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Mapping sur chaque note pour créer une NoteCard */}
        {notes.map((note) => (
          <NoteCard
            key={note.id}        // Clé unique pour React
            note={note}          // Données de la note
            onEdit={onEditNote}  // Prop pour la fonction d'édition
            onDelete={onDeleteNote} // Prop pour la fonction de suppression
          />
        ))}
        
        {/* Bouton d'ajout (masqué pendant une recherche) */}
        {!isSearching && (
          <AddButton 
            onClick={handleAddNote}  // Gestionnaire de clic pour ajouter une note
            className="h-60"         // Hauteur fixe pour correspondre aux cartes de notes
          />
        )}
      </div>

      {/* Messages pour les états vides */}
      
      {/* Message quand aucune note ne correspond à la recherche */}
      {isSearching && notes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No notes match your search
        </div>
      )}
      
      {/* Message quand il n'y a aucune note (hors recherche) */}
      {!isSearching && notes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No notes yet. Click the "+" button to create your first note!
        </div>
      )}
    </div>
  );
}

export default NoteGrid;