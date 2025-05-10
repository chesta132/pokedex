import { useEffect, useState } from "react";
import Card from "./Card";
import getPokemonList from "../../../../api/pokemonList";
import PokeLoading from "../../PokeLoading";
import { searchPokemon } from "../../../../api/searchPokemonList";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function PokeCardList({ searchValue = "" }) {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  function handleSetLimit(e) {
    e.preventDefault();
    setLimit(e.target[0].value);
  }
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
    return <PokeLoading />;
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">Error: {error.message}</div>
    );
  }

  // Penanganan ketika tidak ada data hasil
  if (!dataList || (dataList.results && dataList.results.length === 0)) {
    return (
      <div className="text-center p-4">
        Tidak ada Pokemon <span className="italic">"{searchValue}"</span> yang
        ditemukan
      </div>
    );
  }

  return (
    <div className="gap-10 flex flex-col" style={{ paddingBottom: "2rem" }}>
      <div className="flex flex-wrap justify-center gap-10 md:gap-20 w-full">
        {Array.isArray(dataList)
          ? // Format hasil pencarian
            dataList.map((pokemon) => (
              <Card
                key={pokemon.id}
                image={pokemon.imageUrl}
                types={pokemon.types}
                name={pokemon.name}
                id={pokemon.id}
              />
            ))
          : dataList.results
          ? // Format hasil dari getPokemonList
            dataList.results.map((pokemon) => (
              <Card
                key={pokemon.id}
                image={pokemon.imageUrl}
                types={pokemon.types}
                name={pokemon.name}
                id={pokemon.id}
              />
            ))
          : null}
      </div>
      <div className="flex justify-around">
        {offset !== 0 && (
          <button
            className="bg-(--red) rounded-[10px] scale-130 text-(--white) cursor-pointer"
            style={{ paddingBlock: "7px", paddingInline: "10px" }}
            onClick={() => setOffset((prev) => (prev -= limit))}
          >
            <ChevronLeft />
          </button>
        )}
        <form onSubmit={handleSetLimit}>
          <input
            type="number"
            placeholder="Set Pokemon List Limit"
            className="border rounded-2xl text-center"
            style={{ padding: "10px" }}
          />
        </form>
        <button
          className="bg-(--red) rounded-[10px] scale-130 text-(--white) cursor-pointer"
          style={{ paddingBlock: "7px", paddingInline: "10px" }}
          onClick={() => setOffset((prev) => (prev += limit))}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
