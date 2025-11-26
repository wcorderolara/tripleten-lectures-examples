'use strict';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

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
 * Fetch the list of Pokémon.
 * @param {number} [limit=30]
 * @param {number} [offset=0]
 * @returns {Promise<Array<{name: string, url: string}>>}
 */
export async function fetchPokemonList(limit = 30, offset = 0) {
    const url = `${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
    const data = await fetchJson(url);
    return data.results ?? [];
}

/**
 * Fetch a Pokémon by full URL (as given by PokeAPI list).
 * @param {string} url
 * @returns {Promise<any>}
 */
export async function fetchPokemonByUrl(url) {
    return fetchJson(url);
}

/**
 * Fetch a Pokémon by ID or name.
 * @param {string|number} idOrName
 * @returns {Promise<any>}
 */
export async function fetchPokemonById(idOrName) {
    const url = `${API_BASE_URL}/pokemon/${idOrName}`;
    return fetchJson(url);
}

// module.exports = {
//     fetchPokemonList,
//     fetchPokemonByUrl,
//     fetchPokemonById,
// };
