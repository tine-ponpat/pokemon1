import React, { useEffect } from "react";
import { pokemonListServices, pokemonDetailServices } from "../../services";
import { usePokemonListStore } from "../../store/pokemonList";
import { useForm } from "react-hook-form";

const useSearchForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { setFetchPokemonList, fetchPokemon, setPokemonList, pokemon } =
    usePokemonListStore();
  const keyword = watch("keyword");

  const callData = async () => {
    const responseList = await pokemonListServices.getPokemonList();
    const pokeList = [];
    setFetchPokemonList({ data: [], loading: true, error: null });
    console.log(1);

    if (responseList.status === 200) {
      const responseResults = responseList.data?.results || [];
      for (const pokemon of responseResults) {
        const response = await pokemonDetailServices.getPokemonDetail(
          pokemon.name
        );

        const pokeData = response.data;
        pokeList.push({
          ...pokeData,
          image:
            pokeData.sprites.other.dream_world.front_default ||
            pokeData.sprites.other["official-artwork"],
        });
      }
      setPokemonList({ data: pokeList, loading: false, error: null });
      // console.log(pokeList)
    } else {
      setFetchPokemonList({
        data: [],
        loading: false,
        error: responseList.error,
      });
      console.log(3);
    }
  };

  useEffect(() => {
    callData();
  }, []);

  useEffect(() => {
    const data = pokemon.data.filter((item) =>
      item.name.toLowerCase().includes(keyword?.toLowerCase())
    );
    setPokemonList({
      data: data,
      loading: false,
      error: null,
    });
  }, [keyword]);

  return {
    fieldKeyWord: register("keyword"),
  };
};

export { useSearchForm };
