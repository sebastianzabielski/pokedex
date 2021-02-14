import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';
import { PokemonBaseModel } from '../models/Pokemon.model';
import { FavoritesModel } from '../models/Favorites.model';
import { setFavorites } from '../services/Storage';

type State = {
  list: FavoritesModel;
};

const initialState: State = {
  list: {},
};

export const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<State['list']>) => {
      state.list = action.payload;
    },
    add: (state, action: PayloadAction<PokemonBaseModel>) => {
      state.list[action.payload.name] = action.payload;
      setFavorites(state.list);
    },
    remove: (state, action: PayloadAction<PokemonBaseModel>) => {
      delete state.list[action.payload.name];
      setFavorites(state.list);
    },
    toggle: (state, action: PayloadAction<PokemonBaseModel>) => {
      if (state.list[action.payload.name]) {
        delete state.list[action.payload.name];
      } else {
        state.list[action.payload.name] = action.payload;
      }
      setFavorites(state.list);
    },
  },
});

export const {
  setList,
  add: addFavorite,
  remove: removeFavorite,
  toggle: toggleFavorite,
} = slice.actions;

export const favoriteList = (state: RootState) =>
  Object.values(state.favorites.list);

export const isFavorite = (state: RootState, key: string) =>
  !!state.favorites.list[key];

export default slice.reducer;
