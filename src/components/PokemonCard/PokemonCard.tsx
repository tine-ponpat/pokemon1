import React from "react";
import { IPokemonDetailResponse } from "../../interface/pokemonDetail";

interface PokemonCardProp {
  data: IPokemonDetailResponse;
}

const PokemonCard = ({ data }: PokemonCardProp) => {
  return (
    <div className="rounded-[20px] overflow-hidden shadow dark:bg-gray-800 dark:border-gray-700 p-[16px] bg-[#253641] max-w-[275px] m-[auto]">
      <div className="bg-[url('../../../public/images/poke-card-bg.png')] bg-center aspect-square w-full bg-cover rounded-[20px]">
        <a
          href="#"
          className="bg-[url('../../../public/images/poke-card-bg.png')]"
        >
          <img
            className="rounded-t-lg h-[218px] p-[40px] w-full"
            src={data.image}
            alt=""
          />
        </a>
      </div>
      <div className="py-5">
        <div className="flex justify-between">
          <h5 className=" capitalize mb-2 text-xl font-bold tracking-tight text-white">
            {data.name}
          </h5>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
            #{data.id}
          </h5>
        </div>
      <div className="flex gap-2 justify-end mt-[16px]">
          {data.types.map((item) => {
            return (
              <span
                className={`badge-type-${item.type.name} px-[14px] capitalize py-1 rounded-[16px]`}>
                {item.type.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
