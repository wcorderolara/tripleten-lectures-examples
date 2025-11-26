const API_BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_LIMIT = 30;

let pokemonListContainer;
let pokemonDetailsContainer;

document.addEventListener('DOMContentLoaded', () => {
    pokemonListContainer = document.getElementById('pokemon-list-container');
    pokemonDetailsContainer = document.getElementById('pokemon-details-container');

    initApp().catch((error) => {
        console.error('Unexpected error during initialization:', error);
        renderError(
            pokemonListContainer,
            'Something went wrong while starting the app. Please refresh the page.'
        );
    });
});

/**
 * Initialize the Pokémon Explorer.
 */
async function initApp() {
    renderLoading(pokemonListContainer, 'Loading Pokémon...');

    try {
        const pokemonList = await fetchPokemonList(POKEMON_LIMIT);
        if (!pokemonList.length) {
            renderError(pokemonListContainer, 'No Pokémon found.');
            return;
        }

        renderPokemonList(pokemonList);

        // Load details for the first Pokémon by default
        const firstPokemon = pokemonList[0];
        await loadPokemonDetails(firstPokemon.url);

        const firstItem = pokemonListContainer.querySelector('.pokemon-item');
        if (firstItem) {
            firstItem.classList.add('active');
            firstItem.focus();
        }
    } catch (error) {
        console.error('Error fetching Pokémon list:', error);
        renderError(
            pokemonListContainer,
            'Failed to load Pokémon list. Please try again later.'
        );
    }
}

/**
 * Fetch a JSON resource and handle network errors.
 * @param {string} url
 * @returns {Promise<any>}
 */
async function fetchJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * Fetch the first N Pokémon.
 * @param {number} limit
 * @returns {Promise<Array<{name: string, url: string}>>}
 */
async function fetchPokemonList(limit) {
    const url = `${API_BASE_URL}/pokemon?limit=${limit}`;
    const data = await fetchJson(url);
    return data.results ?? [];
}

/**
 * Display a loading message in a container.
 * @param {HTMLElement} container
 * @param {string} message
 */
function renderLoading(container, message) {
    container.innerHTML = `<div class="loading">${message}</div>`;
}

/**
 * Display an error message in a container.
 * @param {HTMLElement} container
 * @param {string} message
 */
function renderError(container, message) {
    container.innerHTML = `<div class="error">${message}</div>`;
}

/**
 * Render the list of Pokémon as interactive items.
 * @param {Array<{name: string, url: string}>} pokemonList
 */
function renderPokemonList(pokemonList) {
    pokemonListContainer.innerHTML = '';

    pokemonList.forEach((pokemon, index) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'pokemon-item';
        item.setAttribute('data-url', pokemon.url);
        item.setAttribute('aria-label', `View details for ${pokemon.name}`);

        item.innerHTML = `
            <span class="pokemon-number">${index + 1}</span>
            <span class="pokemon-name">${pokemon.name}</span>
        `;

        item.addEventListener('click', () => {
            setActiveItem(item);
            loadPokemonDetails(pokemon.url).catch((error) => {
                console.error('Error fetching Pokémon details:', error);
                renderError(
                    pokemonDetailsContainer,
                    'Failed to load Pokémon details. Please try again later.'
                );
            });
        });

        pokemonListContainer.appendChild(item);
    });
}

/**
 * Set the clicked Pokémon item as active and remove the active state from others.
 * @param {HTMLElement} activeElement
 */
function setActiveItem(activeElement) {
    const items = pokemonListContainer.querySelectorAll('.pokemon-item');
    items.forEach((item) => {
        item.classList.toggle('active', item === activeElement);
    });
}

/**
 * Load and display the details for a specific Pokémon.
 * @param {string} url
 */
async function loadPokemonDetails(url) {
    renderLoading(pokemonDetailsContainer, 'Loading Pokémon details...');

    const pokemon = await fetchJson(url);
    renderPokemonDetails(pokemon);
}

/**
 * Render Pokémon details in the details panel.
 * @param {any} pokemon
 */
function renderPokemonDetails(pokemon) {
    if (!pokemon) {
        renderError(pokemonDetailsContainer, 'No details available for this Pokémon.');
        return;
    }

    const officialArtwork = pokemon.sprites?.other?.['official-artwork']?.front_default;
    const defaultSprite = pokemon.sprites?.front_default;
    const imageUrl = officialArtwork || defaultSprite || '';
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
        .join('');

    const heightMeters = (pokemon.height ?? 0) / 10;
    const weightKg = (pokemon.weight ?? 0) / 10;
    const baseExperience = pokemon.base_experience ?? 'N/A';
    const abilitiesText = (pokemon.abilities ?? [])
        .map((ability) => ability.ability?.name)
        .filter(Boolean)
        .join(', ') || 'Unknown';

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

/**
 * Sanitize Pokémon type name to be safe as a CSS class suffix.
 * @param {string} typeName
 * @returns {string}
 */
function sanitizeTypeName(typeName) {
    return String(typeName).toLowerCase().replace(/[^a-z0-9_-]/g, '');
}
