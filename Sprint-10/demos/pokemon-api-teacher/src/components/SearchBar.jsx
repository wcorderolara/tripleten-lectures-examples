import React, { useState, useEffect } from 'react';

const SearchBar = ({ searchTerm, onSearch, onClear }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  
  // Debounce function
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        onSearch(localSearchTerm);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [localSearchTerm, onSearch, searchTerm]);
  
  // Update local state when prop changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);
  
  const handleChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };
  
  const handleClear = () => {
    setLocalSearchTerm('');
    onClear();
  };
  
  return (
    <div className="search-container">
      <input
        type="text"
        value={localSearchTerm}
        onChange={handleChange}
        placeholder="Search Pokémon by name..."
        className="search-input"
      />
      {localSearchTerm && (
        <button onClick={handleClear} className="clear-search-btn">
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;