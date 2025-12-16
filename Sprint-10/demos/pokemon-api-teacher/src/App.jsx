import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/pokemonDetails';
import SearchBar from './components/SearchBar';
import './App.css'  ;

function App() {
  // State management
  const [pokemonList, setPokemonList] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Type colors for styling
  const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  };

  // Fetch initial Pokémon list
  useEffect(() => {
    fetchInitialPokemon();
  }, []);

  // Handle scroll for infinite loading
  useEffect(() => {
    const handleScroll = () => {
      if (isSearching) return;
      
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMorePokemon();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSearching, offset]);

  // Fetch first 30 Pokémon
  const fetchInitialPokemon = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');
      
      if (!response.ok) throw new Error('Failed to fetch Pokémon');
      
      const data = await response.json();
      setPokemonList(data.results);
      setAllPokemon(data.results);
      setOffset(30);
      
      // Load details for first Pokémon
      if (data.results.length > 0) {
        fetchPokemonDetails(data.results[0].url);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load more Pokémon
  const loadMorePokemon = async () => {
    if (isSearching || loading) return;
    
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`);
      
      if (!response.ok) throw new Error('Failed to load more Pokémon');
      
      const data = await response.json();
      
      // Update both lists
      const newAllPokemon = [...allPokemon, ...data.results];
      setAllPokemon(newAllPokemon);
      
      // Only update displayed list if not searching
      if (!isSearching) {
        setPokemonList(newAllPokemon);
      }
      
      setOffset(prev => prev + 30);
    } catch (err) {
      console.error('Error loading more Pokémon:', err);
    }
  };

  // Fetch details for a specific Pokémon
  const fetchPokemonDetails = async (url) => {
    try {
      setLoadingDetails(true);
      const response = await fetch(url);
      
      if (!response.ok) throw new Error('Failed to fetch Pokémon details');
      
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingDetails(false);
    }
  };

  // Handle Pokémon selection
  const handlePokemonSelect = (pokemon) => {
    fetchPokemonDetails(pokemon.url);
  };

  // Handle search
  const handleSearch = async (term) => {
    const searchTerm = term.trim().toLowerCase();
    setSearchTerm(searchTerm);
    
    if (!searchTerm) {
      setIsSearching(false);
      setPokemonList(allPokemon);
      return;
    }
    
    setIsSearching(true);
    
    // Filter from loaded Pokémon
    const filteredFromLoaded = allPokemon.filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchTerm)
    );
    
    // Try to find exact match from API
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
      
      if (response.ok) {
        const pokemonData = await response.json();
        const apiResult = {
          name: pokemonData.name,
          url: `https://pokeapi.co/api/v2/pokemon/${pokemonData.id}/`
        };
        
        // Combine results, remove duplicates
        const combinedResults = [...filteredFromLoaded, apiResult];
        const uniqueResults = combinedResults.filter((pokemon, index, self) => 
          index === self.findIndex(p => p.name === pokemon.name)
        );
        
        setPokemonList(uniqueResults);
      } else {
        setPokemonList(filteredFromLoaded);
      }
    } catch (err) {
      console.log('Search API error:', err);
      // If API search fails, use local filtered results
      setPokemonList(filteredFromLoaded);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
    setPokemonList(allPokemon);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Pokémon Explorer</h1>
        <p className="subtitle">Click on a Pokémon to see its details</p>
      </header>

      <SearchBar 
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onClear={clearSearch}
      />

      {error && <div className="error-message">{error}</div>}

      <div className="content">
        <PokemonList 
          pokemonList={pokemonList}
          selectedPokemon={selectedPokemon}
          onSelect={handlePokemonSelect}
          loading={loading}
          isSearching={isSearching}
        />

        <PokemonDetails 
          pokemon={selectedPokemon}
          loading={loadingDetails}
          typeColors={typeColors}
        />
      </div>
    </div>
  );
}

export default App;