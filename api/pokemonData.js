export default function listPokemonData(pokemonData) {
  return {
    id: pokemonData.id,
    name: pokemonData.name,
    types: pokemonData.types.map((type) => type.type.name),
    imageUrl:
      pokemonData.sprites.other["official-artwork"].front_default ||
      pokemonData.sprites.front_default,
  };
}