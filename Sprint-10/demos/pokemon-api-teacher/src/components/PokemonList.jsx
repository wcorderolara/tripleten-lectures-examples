import React from 'react';

const PokemonList = ({ pokemonList, selectedPokemon, onSelect, loading, isSearching }) => {
  const getPokemonId = (url) => {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : '?';
  };

  const isSelected = (pokemon) => {
    return selectedPokemon && pokemon.name === selectedPokemon.name;
  };

  if (loading) {
    return (
      <div className="pokemon-list">
        <h2>First 30 Pokémon</h2>
        <div className="loading">Loading Pokémon...</div>
      </div>
    );
  }

  return (
    <div className="pokemon-list">
      <h2>
        {isSearching ? 'Search Results' : 'Pokémon List'} 
        <span className="count-badge">({pokemonList.length})</span>
      </h2>
      
      <div className="pokemon-list-container">
        {pokemonList.length === 0 ? (
          <div className="no-results">
            <p>No Pokémon found</p>
            <p>Try a different search term</p>
          </div>
        ) : (
          pokemonList.map((pokemon, index) => (
            <div
              key={index}
              className={`pokemon-item ${isSelected(pokemon) ? 'active' : ''}`}
              onClick={() => onSelect(pokemon)}
            >
              <span className="pokemon-number">{getPokemonId(pokemon.url)}</span>
              <span className="pokemon-name">{pokemon.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PokemonList;