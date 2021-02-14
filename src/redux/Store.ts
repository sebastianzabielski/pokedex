import { combineReducers, configureStore } from '@reduxjs/toolkit';
import PokemonList from './PokemonListSlice';
import PokemonDetailsSlice from './PokemonDetailsSlice';
import FavoritesSlice from './FavoritesSlice';

const rootReducer = combineReducers({
  list: PokemonList,
  details: PokemonDetailsSlice,
  favorites: FavoritesSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        warnAfter: 1000,
      },
      serializableCheck: {
        warnAfter: 1000,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
