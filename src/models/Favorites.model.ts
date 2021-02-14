import { PokemonBaseModel } from './Pokemon.model';

export type FavoritesModel = {
  [key: string]: PokemonBaseModel;
};
