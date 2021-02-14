import { combineReducers, configureStore } from '@reduxjs/toolkit';
import PokemonList from './PokemonListSlice';
import PokemonDetailsSlice from './PokemonDetailsSlice';
import FavoritesSlice from './FavoritesSlice';
import PokemonTypesSlice from './PokemonTypesSlice';

const rootReducer = combineReducers({
  list: PokemonList,
  details: PokemonDetailsSlice,
  favorites: FavoritesSlice,
  types: PokemonTypesSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
