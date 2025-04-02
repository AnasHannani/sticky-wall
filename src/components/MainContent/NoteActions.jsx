import { Edit,Delete } from "../../assets/icons";

function NoteActions({ onEdit, onDelete }) {
  return (
    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={onEdit}
        className="p-1 text-gray-600 hover:text-gray-900 cursor-pointer"
        aria-label="Edit note"
      >
        <Edit className="h-5 w-5" />
      </button>
      <button
        onClick={onDelete}
        className="p-1 text-gray-600 hover:text-gray-900 cursor-pointer"
        aria-label="Delete note"
      >
        <Delete className="h-5 w-5" />
      </button>
    </div>
  );
}

export default NoteActions;