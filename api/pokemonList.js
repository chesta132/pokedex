import listPokemonData from "./pokemonData";

const getPokemonList = (limit = 20, offset = 0) => {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then((listData) => {
      // Simpan informasi pagination
      const paginationInfo = {
        count: listData.count,
        next: listData.next,
        previous: listData.previous,
      };

      // Buat array promises untuk mengambil detail setiap Pokémon
      const detailPromises = listData.results.map((pokemon) =>
        fetch(pokemon.url)
          .then((response) => {
            if (!response.ok)
              throw new Error(
                `Error fetching ${pokemon.name}: ${response.status}`
              );
            return response.json();
          })
          .then((pokeResData) => listPokemonData(pokeResData))
          .catch((error) => {
            console.error(
              `Failed to fetch details for ${pokemon.name}:`,
              error
            );
            // Return minimal data if detail fetch fails
            return {
              id: extractIdFromUrl(pokemon.url),
              name: pokemon.name,
              types: ["Unknown"],
              imageUrl: null,
            };
          })
      );

      // Tunggu semua promises selesai
      return Promise.all(detailPromises).then((pokemonDetails) => {
        return { ...paginationInfo, results: pokemonDetails };
      });
    });
};

export default getPokemonList;
