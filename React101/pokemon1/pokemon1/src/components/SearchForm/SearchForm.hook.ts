import React, { useEffect, useState } from "react";
import { pokemonListServices, pokemonDetailServices } from "../../services";
import { usePokemonListStore } from "../../store/pokemonList";
import { useForm } from "react-hook-form";
import { generationList } from "../../utils/optionList";
import { IPokemonDetailResponse } from "../../interface/pokemonDetail";

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
  const type = watch("type");
  const generation = watch("generation");
  const sort = watch("sort");

  const [pokeList, setPokeList] = useState([]);

  const callData = async (filter: {
    name: string;
    limit: number;
    offset: number;
  }) => {
    setFetchPokemonList({ data: [], loading: true, error: null });
    const responseList = await pokemonListServices.getPokemonList(
      filter.limit,
      filter.offset
    );

    if (responseList.status === 200) {
      const responseResults = responseList.data?.results || [];
      const newPokeList = [];

      for (const pokemon of responseResults) {
        const response = await pokemonDetailServices.getPokemonDetail(
          pokemon.name
        );

        const pokeData = response.data;
        if (pokeData)
          newPokeList.push({
            ...pokeData,
            image:
              pokeData.sprites.other.dream_world.front_default ||
              pokeData.sprites.other["official-artwork"],
          });
      }

      setPokeList(newPokeList);
      const data = filterPokemon(keyword, type, sort);
      setPokemonList({ data: newPokeList, loading: false, error: null });
      // console.log(pokeList)
    } else {
      setPokemonList({
        data: [],
        loading: false,
        error: responseList.error,
      });
    }
  };

  const filterPokemon = (
    keyword: string,
    type: string,
    sort: "id" | "name"
  ) => {
    const keywordFilter = pokeList.filter((item) =>
      item.name.toLowerCase().includes(keyword?.toLowerCase())
    );

    const typeFilter =
      type !== "all types"
        ? keywordFilter.filter((item) =>
            item.types.find((f) =>
              f.type.name.toLowerCase().includes(type.toLocaleLowerCase())
            )
          )
        : keywordFilter;

    return sortBy(typeFilter, sort);
  };

  const sortBy = (data: IPokemonDetailResponse[], type: "id" | "name") => {
    switch (type) {
      case "id":
        return data.sort((a, b) => a.id - b.id);
      case "name":
        return data.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
      default:
        return data.sort((a, b) => a.id - b.id);
    }
  };

  useEffect(() => {
    if (generation !== undefined) {
      callData(generationList[generation]);
    }
  }, [generation]);

  useEffect(() => {
    const data = filterPokemon( keyword, type, sort);
    setPokemonList({
      data: data,
      loading: false,
      error: null,
    });
  }, [keyword, type, sort]);

  return {
    fieldKeyWord: register("keyword"),
    fieldGeneration: register("generation"),
    fieldType: register("type"),
    fieldSort: register("sort"),
  };
};

export { useSearchForm };
