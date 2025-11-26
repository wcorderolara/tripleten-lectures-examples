const API_BASE_URL = "https://pokeapi.co/api/v2";
const POKEMON_LIMIT = 50;

let pokemonListContainer;
let pokemonDetailsContainer;

document.addEventListener("DOMContentLoaded", () => {
  pokemonListContainer = document.querySelector("#pokemon-list-container");
  pokemonDetailsContainer = document.querySelector(
    "#pokemon-details-container"
  );

  initApp();
});

/**
 * Initialize the App
 */
async function initApp() {
  try {
    const pokemonList = await fetchPokemonList(POKEMON_LIMIT);
    console.log(pokemonList);

    if (pokemonList.length === 0) {
      renderError(pokemonListContainer, "No Pokemon found.");
      return;
    }

    renderPokemonList(pokemonList);

    // Load the details of the first pokemon
    const firstPokemon = pokemonList[0];
    console.log(firstPokemon);
    loadPokemonDetails(firstPokemon.url);

    const firstItem = pokemonListContainer.querySelector(".pokemon-item");
    if (firstItem) {
      firstItem.classList.add("active");
      firstItem.focus();
    }
  } catch (error) {
    console.log(error);
  }
}

async function fetchData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Something bad is happening, check the Team Rocket");
  }

  return response.json();
}

/**
 * Fetch the first 30 pokemons
 */
async function fetchPokemonList(limit) {
  const url = `${API_BASE_URL}/pokemon?limit=${limit}`;
  const data = await fetchData(url);
  return data.results;
}

/**
 * Render the List Of Pokemons
 */
function renderPokemonList(pokemons) {
  pokemonListContainer.innerHTML = "";

  pokemons.forEach((pokemon, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "pokemon-item";

    item.innerHTML = `
            <span class="pokemon-number">${index + 1}</span>
            <span class="pokemon-name">${pokemon.name}</span>
        `;

    item.addEventListener("click", () => {
      setActiveItem(item);
      loadPokemonDetails(pokemon.url).catch((error) => {
        console.error("Error fetching the pokemon details: ", error);
        renderError(pokemonDetailsContainer, "Failed to load Pokemon details");
      });
    });

    pokemonListContainer.appendChild(item);
  });
}

// loadPokemonDetailsFunction
async function loadPokemonDetails(url) {
  const pokemon = await fetchData(url);
  renderPokemonDetails(pokemon);
}

/**
 * RENDER POKEMON DETAILS function
 */
function renderPokemonDetails(pokemon) {
  if (!pokemon) {
    renderError(
      pokemonDetailsContainer,
      "No details available for this Pokémon."
    );
    return;
  }

  const officialArtwork =
    pokemon.sprites?.other?.["official-artwork"]?.front_default;
  const defaultSprite = pokemon.sprites?.front_default;
  const imageUrl = officialArtwork || defaultSprite || "";
  const imageAlt = imageUrl
    ? `${pokemon.name} official artwork`
    : `${pokemon.name} (image not available)`;

  const typeBadgesHtml = (pokemon.types ?? [])
    .map((typeInfo) => {
      const typeName = typeInfo.type.name;
      const safeTypeName = sanitizeTypeName(typeName);
      return `
                <span class="type-badge type-badge--${safeTypeName}">
                    ${typeName}
                </span>
            `;
    })
    .join("");

  const heightMeters = (pokemon.height ?? 0) / 10;
  const weightKg = (pokemon.weight ?? 0) / 10;
  const baseExperience = pokemon.base_experience ?? "N/A";
  const abilitiesText =
    (pokemon.abilities ?? [])
      .map((ability) => ability.ability?.name)
      .filter(Boolean)
      .join(", ") || "Unknown";

  pokemonDetailsContainer.innerHTML = `
        <div class="pokemon-card">
            <div class="pokemon-image">
                ${
                  imageUrl
                    ? `<img src="${imageUrl}" alt="${imageAlt}" loading="lazy" />`
                    : `<span>No image available</span>`
                }
            </div>
            <h2 class="pokemon-name">${pokemon.name}</h2>
            <div class="type-badges">
                ${typeBadgesHtml}
            </div>
            <div class="pokemon-info">
                <div class="info-card">
                    <h3>Height</h3>
                    <p>${heightMeters} m</p>
                </div>
                <div class="info-card">
                    <h3>Weight</h3>
                    <p>${weightKg} kg</p>
                </div>
                <div class="info-card">
                    <h3>Base Experience</h3>
                    <p>${baseExperience}</p>
                </div>
                <div class="info-card">
                    <h3>Abilities</h3>
                    <p>${abilitiesText}</p>
                </div>
            </div>
        </div>
    `;
}

function setActiveItem(activeItem) {
  const items = pokemonListContainer.querySelectorAll(".pokemon-item");
  items.forEach((item) => {
    item.classList.toggle("active", item === activeItem);
  });
}

/**
 * Render an Error
 */
function renderError(container, message) {
  container.innerHTML = `<div class="error">${message}</div>`;
}

/**
 * Sanitize Pokémon type name to be safe as a CSS class suffix.
 * @param {string} typeName
 * @returns {string}
 */
function sanitizeTypeName(typeName) {
  return String(typeName)
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "");
}
