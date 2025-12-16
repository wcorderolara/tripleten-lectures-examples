import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const API_BASE_URL = "https://pokeapi.co/api/v2"; // this value will never change
  // The State could change over time
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonLimit, setPokemonLimit] = useState(30);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [allPokemons, setAllPokemons] = useState([]);

  // Fetch Pokemon List on Component Mount

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/pokemon?limit=${pokemonLimit}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error("Failed to Fetch Pokémon list");
      }

      const data = await response.json();
      setPokemonList(data.results);
      setAllPokemons(data.results);

      if(data.results.length > 0) {
        fetchPokemonDetails(data.results[0].url);
      }
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to Fetch Pokemon Details
  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);

       if (!response.ok) {
        throw new Error("Failed to Fetch Pokémon Details");
      }
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
    } finally {
      setIsLoadingDetails(false);
    }
  }

  const isSelected = (pokemon) => {
    return selectedPokemon && selectedPokemon.name === pokemon.name;
  }

  const handleChangeTerm = (term) => {
    if(!term) {
      setPokemonList(allPokemons);
      setSearchTerm("");
      fetchPokemonDetails(allPokemons[0].url);
    } else {
      setSearchTerm(term);
    }
  }

  const handleSearch = async (term) => {
    const pokemonSearch = term.trim().toLowerCase();

    if (!pokemonSearch) {
      setPokemonList(allPokemons);
      return false;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/pokemon/${pokemonSearch}`);
      
      if (!response.ok) {
        throw new Error("Failed to Fetch Pokémon Details");
      } else {
        const pokemonData = await response.json();
        const pokemonListItem = {
          name: pokemonData.name,
          url: `${API_BASE_URL}/pokemon/${pokemonData.id}/`
        }

        setPokemonList([pokemonListItem]);
        setSelectedPokemon(pokemonData);
      }

    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  }

  const getPokemonId = (url) => {
    //https://pokeapi.co/api/v2/pokemon/149/
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : null;
  }

  // const pokemonInfo = {
  //   height: selectedPokemon.height / 10,
  //   weight: selectedPokemon.weight / 10,
  //   types: selectedPokemon.types?.map( (type) =>  type.type?.name),
  //   baseExperience: selectedPokemon.base_experience ?? 'N/A',
  //   abilities:(selectedPokemon.abilities ?? [])
  //       .map((ability) => ability.ability?.name)
  //       .filter(Boolean)
  //       .join(', ') || 'Unknown',

  // }
  return (
    <div className="container">
      <header>
        <h1>Pokémon Explorer</h1>
        <p className="subtitle">Click on a Pokémon to see its details</p>
      </header>

      <div className="search-container">
        <input type="text" placeholder="Search Pokemon by Name" 
        className="search-input" value={searchTerm} onChange={(e) => handleChangeTerm(e.target.value)} />
        <button type="button" className="search-button" onClick={() => handleSearch(searchTerm)}>Search</button>
      </div>

      <main className="content" aria-label="Pokémon explorer">
        <section className="pokemon-list" aria-label="Pokémon list">
          <h2>First {pokemonLimit} Pokémon</h2>
          <div id="pokemon-list-container">
            {isLoading && <div className="loading">Loading Pokémon...</div>}

            {!isLoading &&
              pokemonList.length > 0 &&
              pokemonList.map((pokemon, index) => (
                <button
                  key={index}
                  type="button"
                  className={`pokemon-item ${isSelected(pokemon) ? 'active' : ''}`}
                  onClick={ () => fetchPokemonDetails(pokemon.url)}
                  data-url={pokemon.url}
                  aria-label={"View details for " + pokemon.name}
                >
                  <span className="pokemon-number">{getPokemonId(pokemon.url)}</span>
                  <span className="pokemon-name">{pokemon.name}</span>
                </button>
              ))}
          </div>
        </section>

        <section className="pokemon-details" aria-label="Pokémon details">
          <h2>Pokémon Details</h2>
          <div id="pokemon-details-container">
            {isLoadingDetails && <div className="loading">Select a Pokémon to see details</div> }
            
            {!isLoadingDetails && selectedPokemon && (
              <div className="pokemon-card">
                  <div className="pokemon-image">
                      <img src={selectedPokemon.sprites?.other?.['official-artwork']?.front_default} alt={`${selectedPokemon.name} official artwork`} loading="lazy" />
                  </div>
                  <h2 className="pokemon-name">{selectedPokemon.name}</h2>
                  <div className="type-badges">
                      {selectedPokemon.types.map( (type, index) => (
                        <span key={index} className={`type-badge type-badge--${type.type?.name}`}>
                            {type.type?.name}
                        </span>
                      ))}
                  </div>
                  <div className="pokemon-info">
                      <div className="info-card">
                          <h3>Height</h3>
                          <p>{selectedPokemon.height / 10} m</p>
                      </div>
                      <div className="info-card">
                          <h3>Weight</h3>
                          <p>{selectedPokemon.weight / 10} kg</p>
                      </div>
                      <div className="info-card">
                          <h3>Base Experience</h3>
                          <p>{selectedPokemon.base_experience ?? 'N/A'}</p>
                      </div>
                      <div className="info-card">
                          <h3>Abilities</h3>
                          <p>{selectedPokemon.abilities.map((ability) => ability.ability?.name).join(', ')}</p>
                      </div>
                  </div>
              </div>
            )}

          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
