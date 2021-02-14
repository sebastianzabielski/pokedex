import { PokemonBaseModel } from './Pokemon.model';
import { Types } from './Types.model';

export type PokemonDetailsTypeModel = {
  name: Types;
  url: string;
};

export type PokemonDetailsModel = {
  order: number;
  name: string;
  types: {
    slot: number;
    type: PokemonDetailsTypeModel;
  }[];
  sprites: {
    front_default: string;
  };
};
