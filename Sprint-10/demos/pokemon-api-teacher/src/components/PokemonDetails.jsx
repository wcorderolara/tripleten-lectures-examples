import React from 'react';

const PokemonDetails = ({ pokemon, loading, typeColors }) => {
  if (loading) {
    return (
      <div className="pokemon-details">
        <h2>Pokémon Details</h2>
        <div className="loading">Loading Pokémon details...</div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="pokemon-details">
        <h2>Pokémon Details</h2>
        <div className="loading">Select a Pokémon to see details</div>
      </div>
    );
  }

  // Process Pokémon data
  const processedPokemon = {
    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
    image: pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default,
    height: pokemon.height / 10,
    weight: pokemon.weight / 10,
    types: pokemon.types.map(t => t.type.name),
    abilities: pokemon.abilities.map(a => a.ability.name),
    baseExperience: pokemon.base_experience,
    id: pokemon.id
  };

  return (
    <div className="pokemon-details">
      <h2>Pokémon Details</h2>
      <div className="pokemon-card">
        <div className="pokemon-image">
          <img src={processedPokemon.image} alt={processedPokemon.name} />
        </div>
        <h2 className="pokemon-name">
          {processedPokemon.name} 
          <span className="pokemon-id">#{processedPokemon.id.toString().padStart(3, '0')}</span>
        </h2>
        
        <div className="type-badges">
          {processedPokemon.types.map(type => (
            <span 
              key={type}
              className="type-badge"
              style={{ backgroundColor: typeColors[type] || '#777' }}
            >
              {type}
            </span>
          ))}
        </div>
        
        <div className="pokemon-info">
          <div className="info-card">
            <h3>Height</h3>
            <p>{processedPokemon.height} m</p>
          </div>
          <div className="info-card">
            <h3>Weight</h3>
            <p>{processedPokemon.weight} kg</p>
          </div>
          <div className="info-card">
            <h3>Base Experience</h3>
            <p>{processedPokemon.baseExperience}</p>
          </div>
          <div className="info-card">
            <h3>Abilities</h3>
            <p>{processedPokemon.abilities.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;