'use strict';

/**
 * Create the Pokémon details HTML string.
 * This is your "component".
 *
 * @param {any} pokemon - Pokémon data from PokeAPI
 * @returns {string} HTML string for the details card
 */
function createPokemonDetailsHTML(pokemon) {
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

    return `
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

export default createPokemonDetailsHTML;

// module.exports = {
//     createPokemonDetailsHTML,
// };
