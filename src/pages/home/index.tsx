import PokemonCard from "../../components/PokemonCard";
import SearchForm from "../../components/SearchForm";
import { usePokemonListStore } from "../../store/pokemonList";

const HomePage = () => {
  const { pokemon,  } = usePokemonListStore();
  console.log(pokemon);

  

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-[20px] mt-[40px] justify-center">
        {pokemon.data.map((item) => {
          return <PokemonCard data={item} />;
        })}
      </div>
    </div>
  );
};

export default HomePage;
