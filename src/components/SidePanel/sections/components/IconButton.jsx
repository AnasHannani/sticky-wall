
const IconButton = ({ icon, onClick }) => {
  return (
    <button
    className="hidden text-gray-400 hover:text-gray-600 group-hover:inline-block ml-1 cursor-pointer"
    onClick={onClick}
  >
    {icon}
  </button>
  );
}

export default IconButton;