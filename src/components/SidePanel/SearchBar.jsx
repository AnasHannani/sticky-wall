import React, { useState, useEffect } from "react";
import { useApp } from "../../data/DataContext";

const SearchBar = () => {
  const { searchTerm, handleSearch, clearSearch } = useApp();
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  // Sync local state with context
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div className="m-3 py-2 border border-gray-300 flex items-center rounded-lg">
      {/* Search icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="size-4 text-gray-400 mx-2"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
      
      <input
        type="text"
        placeholder="Search lists, and tags..."
        value={localSearchTerm}
        onChange={handleChange}
        className="w-full focus:outline-none text-gray font-sans text-sm/5 font-semibold"
      />
      
      {localSearchTerm && (
        <button 
          onClick={() => {
            setLocalSearchTerm('');
            clearSearch();
          }}
          className="text-gray-400 hover:text-gray-600 px-2"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;