// Import des dépendances
import { useApp } from "../../hooks/useApp"; // Contexte d'application
import NoteActions from "./NoteActions";          // Composant des actions de note

// Définition du composant NoteCard avec ses props
function NoteCard({ 
  note,     // Objet contenant les données de la note (obligatoire)
  onEdit,   // Fonction de callback pour l'édition (optionnelle)
  onDelete, // Fonction de callback pour la suppression (optionnelle)
  tags = [] // Tableau des tags (optionnel, vide par défaut)
}) {
  // Récupération des utilitaires depuis le contexte
  const { 
    getDefaultNoteColor, // Fonction pour obtenir une couleur par défaut
    getListNameById      // Fonction pour obtenir un nom de liste par ID
  } = useApp();

  // Gestionnaire de suppression avec confirmation
  const handleDelete = () => {
    // Demande de confirmation avant suppression
    if (window.confirm("Are you sure you want to delete this note?")) {
      // Utilisation du optional chaining au cas où onDelete ne serait pas défini
      onDelete?.(note.id);
    }
  };

  return (
    // Conteneur principal de la carte
    // La couleur provient soit de la note, soit d'une valeur par défaut
    // group permet de gérer des états hover sur les enfants
    <div
      className={`group relative flex min-h-60 flex-col rounded-md p-5 shadow-sm ${
        note.color || getDefaultNoteColor()
      }`}
    >
      {/* Composant des actions (édition/suppression) */}
      <NoteActions 
        onEdit={() => onEdit?.(note)}  // Optional chaining pour la sécurité
        onDelete={handleDelete}        // Passe notre gestionnaire de suppression
      />

      {/* Titre de la note */}
      <h3 className="mb-3 text-lg font-semibold">
        {note.title}
      </h3>

      {/* Contenu de la note avec gestion de différents formats */}
      <div className="flex-1 text-sm">
        {Array.isArray(note.content) ? (
          // Si le contenu est un tableau, on map chaque ligne
          note.content.map((line, idx) => (
            <p key={idx} className="mb-2">
              {line}
            </p>
          ))
        ) : (
          // Si le contenu est une simple string
          <p className="mb-2">{note.content}</p>
        )}
      </div>

      {/* Ici vous pourriez ajouter l'affichage des tags si nécessaire */}
      {/* {tags.length > 0 && (
        <div className="mt-2">
          {tags.map(tag => <Tag key={tag.id} tag={tag} />)}
        </div>
      )} */}
    </div>
  );
}

export default NoteCard;