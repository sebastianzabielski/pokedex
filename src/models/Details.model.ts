import { PokemonBaseModel } from './Pokemon.model';
import { Types } from './Types.model';
import Translation from '../services/Translation';
export type PokemonDetailsTypeModel = {
  name: Types;
  url: string;
};

export type PokemonDetailsStatsModel = {
  base_stat: number;
  effort: number;
  stat: {
    name: keyof typeof Translation;
    url: string;
  };
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
  stats: PokemonDetailsStatsModel[];
};
