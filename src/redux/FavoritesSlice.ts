import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';
import { PokemonBasicModel } from '../models/Pokemon.model';
import AsyncStorage from '@react-native-async-storage/async-storage';

type State = {
  list: {
    [key: string]: PokemonBasicModel;
  };
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
    add: (state, action: PayloadAction<PokemonBasicModel>) => {
      state.list[action.payload.name] = action.payload;
      AsyncStorage.setItem('favorites', JSON.stringify(state.list));
    },
    remove: (state, action: PayloadAction<PokemonBasicModel>) => {
      delete state.list[action.payload.name];
      AsyncStorage.setItem('favorites', JSON.stringify(state.list));
    },
  },
});

export const {
  setList,
  add: addFavorite,
  remove: removeFavorite,
} = slice.actions;

export const favoriteList = (state: RootState) =>
  Object.values(state.favorites.list);

export const isFavorite = (state: RootState, key: string) =>
  !!state.favorites.list[key];

export default slice.reducer;
