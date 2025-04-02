import { Plus } from "../../assets/icons";

function ButtonAddNote({ onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex items-center justify-center min-h-60 rounded-md p-5 shadow-sm text-9xl bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 cursor-pointer"
    >
      <Plus/>
    </button>
  );
}

export default ButtonAddNote;
