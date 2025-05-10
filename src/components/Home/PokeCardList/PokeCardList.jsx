import { useEffect, useState } from "react";
import Card from "./Card";
import getPokemonList from "../../../../api/pokemonList";
import Loading from "../../loading";
import { searchPokemon } from "../../../../api/searchPokemonList";

export default function PokeCardList({ limit = 20, offset = 0, searchValue = "" }) {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const fetchData = async () => {
      try {
        if (searchValue.trim() !== "") {
          const data = await searchPokemon(searchValue);
          setDataList(data);
        } else {
          const data = await getPokemonList(limit, offset);
          setDataList(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit, offset, searchValue]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error.message}</div>;
  }

  // Penanganan ketika tidak ada data hasil
  if (!dataList || (dataList.results && dataList.results.length === 0)) {
    return <div className="text-center p-4">Tidak ada Pokemon <span className="italic">"{searchValue}"</span> yang ditemukan</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-10 md:gap-20 w-full">
      {Array.isArray(dataList) ? (
        // Format hasil pencarian
        dataList.map((pokemon) => (
          <Card
            key={pokemon.id}
            image={pokemon.imageUrl}
            types={pokemon.types}
            name={pokemon.name}
            id={pokemon.id}
          />
        ))
      ) : dataList.results ? (
        // Format hasil dari getPokemonList
        dataList.results.map((pokemon) => (
          <Card
            key={pokemon.id}
            image={pokemon.imageUrl}
            types={pokemon.types}
            name={pokemon.name}
            id={pokemon.id}
          />
        ))
      ) : null}
    </div>
  );
}