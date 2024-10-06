import { useEffect } from "react";
import PokemonCard from "../../components/PokemonCard";
import SearchForm from "../../components/SearchForm";
import { usePokemonListStore } from "../../store/pokemonList";
import ReactLoading from "react-loading";

const HomePage = () => {
  const { pokemon, fetchPokemon } = usePokemonListStore();
  console.log();

  return (
    <div className=" w-[90%] m-[auto] max-w-[1100px]">
      <div className="flex justify-center">
        <img
          src="/public/images/logo.webp"
          className="max-h-[80px] mt-[20px]"
          alt=""
        />
      </div>
      <SearchForm />
      {pokemon.loading && (
        <div className="h-[600px] flex justify-center items-center">
          <ReactLoading type="balls" color="#fff" />
        </div>
      )}
      {!pokemon.loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-[20px] mt-[40px] justify-center">
          {pokemon.data.map((item) => {
            return (
              <PokemonCard
                image={item.image || ""}
                name={item.name}
                id={item.id}
                types={item.types}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
