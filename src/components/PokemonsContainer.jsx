import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { formatPokemonData } from "../utils/pokemon-helper";
import Loader from "./Loader";

// type을 props로 전달 받도록 합니다
const PokemonsContainer = ({ type, setSelectedPokemon }) => {
  // 포켓몬 리스트 상태관리
  const [pokemons, setPokemons] = useState([]);
  // loading 상태 관리
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      const API_END_POINT = `https://pokeapi.co/api/v2/type/${type}`;
      const res = await fetch(API_END_POINT);
      const data = await res.json();
      const pokemonList = await Promise.all(
        data.pokemon.map(async ({ pokemon }) => {
          const res = await fetch(pokemon.url);
          const detail = await res.json();
          return formatPokemonData(detail);
        })
      );
      setPokemons(pokemonList);
      setLoading(false);
    };
    fetchPokemons();
  }, [type]);

  // API를 호출하는 동안 로더 컴포넌트를 보여줍니다.
  // <Loader/>

  return (
    <div className="pokemons-container">
      {/* 포켓몬 카드리스트를 상태로 관리하고 리스트 렌더링 해봅시다 */}
      {loading ? (
        <Loader />
      ) : (
        pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => setSelectedPokemon(pokemon)}
          />
        ))
      )}
    </div>
  );
};

export default PokemonsContainer;
