// PokemonSearch.js
// Modul untuk mencari Pokemon berdasarkan nama menggunakan PokeAPI

import listPokemonData from "./pokemonData";

// Jumlah total Pokemon yang tersedia di PokeAPI
// const MAX_POKEMON_COUNT = 1025;

/**
 * Mendapatkan daftar semua Pokemon dari PokeAPI
 * @returns {Promise<Array>} Array berisi daftar Pokemon (nama dan URL)
 */
async function getAllPokemon() {
  const initalize = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1")
    .then((response) => {
      if (!response.ok)
        throw new Error(`Error fetching ${pokemon.name}: ${response.status}`);
      return response.json();
    })
    .then((pokeResData) => {
      return { count: pokeResData.count };
    })
    .catch((error) => {
      console.error(`Failed to fetch details for ${pokemon.name}:`, error);
      // Return minimal data if detail fetch fails
      return { count: 1302 };
    });
  const MAX_POKEMON_COUNT = await initalize.count;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON_COUNT}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    throw error;
  }
}

/**
 * Mendapatkan detail Pokemon berdasarkan URL
 * @param {string} url - URL endpoint untuk Pokemon
 * @returns {Promise<Object>} Object berisi detail Pokemon
 */
async function getPokemonDetails(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching Pokemon details from ${url}:`, error);
    return null;
  }
}

/**
 * Mencari Pokemon berdasarkan bagian dari nama
 * @param {string} searchTerm - Kata kunci pencarian
 * @returns {Promise<Array>} Array berisi Pokemon yang cocok dengan pencarian
 */
async function searchPokemonByName(searchTerm) {
  if (!searchTerm || typeof searchTerm !== "string") {
    throw new Error("Search term harus berupa string dan tidak boleh kosong");
  }

  const term = searchTerm.toLowerCase().trim().replaceAll(" ", "-");

  try {
    // Dapatkan semua Pokemon
    const allPokemon = await getAllPokemon();

    // Filter Pokemon berdasarkan nama yang mengandung search term
    const filteredPokemon = allPokemon.filter((pokemon) =>
      pokemon.name.includes(term)
    );

    if (filteredPokemon.length === 0) {
      return [];
    }

    // Ambil detail untuk setiap Pokemon yang cocok
    const pokemonDetailsPromises = filteredPokemon.map((pokemon) =>
      getPokemonDetails(pokemon.url)
    );

    // Tunggu semua detail Pokemon dimuat
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);

    // Filter out null values (in case some requests failed)
    return pokemonDetails.filter((pokemon) => pokemon !== null);
  } catch (error) {
    console.error("Error searching Pokemon:", error);
    throw error;
  }
}

/**
 * Fungsi untuk mencari dan memformat data Pokemon
 * @param {string} searchTerm - Kata kunci pencarian
 * @returns {Promise<Array>} Array berisi data Pokemon yang sudah diformat
 */
async function searchPokemon(searchTerm) {
  try {
    const pokemonList = await searchPokemonByName(searchTerm);
    if (pokemonList.length === 0) {
      return "";
    }
    return pokemonList.map((pokemon) => listPokemonData(pokemon));
  } catch (error) {
    console.error("Error in searchPokemon:", error);
    throw error;
  }
}

// Export fungsi untuk digunakan dalam aplikasi
export { searchPokemon, getAllPokemon, getPokemonDetails };
