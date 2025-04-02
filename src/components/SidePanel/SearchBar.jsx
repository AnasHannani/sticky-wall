import React, { useState, useEffect } from "react";
import { useApp } from "../../data/DataContext";
import { Search } from "../../assets/icons"; // Importation de l'icône de recherche

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
      <Search/>
      
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