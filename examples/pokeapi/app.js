'use strict';

import { fetchPokemonList, fetchPokemonByUrl } from './api.js';
import createPokemonDetailsHTML from './pokemonDetails.js';

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

    const pokemon = await fetchPokemonByUrl(url);

    if (!pokemon) {
        renderError(pokemonDetailsContainer, 'No details available for this Pokémon.');
        return;
    }

    renderPokemonDetails(pokemon);
}

/**
 * Render Pokémon details in the details panel using the HTML "component".
 * @param {any} pokemon
 */
function renderPokemonDetails(pokemon) {
    const html = createPokemonDetailsHTML(pokemon);
    pokemonDetailsContainer.innerHTML = html;
}
