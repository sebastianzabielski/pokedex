import { createSlice, Dispatch } from '@reduxjs/toolkit';
import Api from '../services/Api';
import { RootState } from './Store';
import { PokemonBaseModel } from '../models/Pokemon.model';
import { clearQueue } from './PokemonDetailsSlice';

type State = {
  pokemonList: PokemonBaseModel[];
  fetching: boolean;
  searchName: string;
  error: boolean;
};

const initialState: State = {
  pokemonList: [],
  fetching: false,
  searchName: '',
  error: false,
};

export const slice = createSlice({
  name: 'pokemonList',
  initialState,
  reducers: {
    setPokemonList: (state, action) => {
      state.pokemonList = action.payload;
    },
    clearStore: (state) => {
      state = initialState;
    },
    setFetchingStatus: (state, action) => {
      state.fetching = action.payload;
    },
    resetList: (state) => {
      state = initialState;
    },
    setSearchName: (state, action) => {
      state.searchName = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPokemonList,
  clearStore,
  setFetchingStatus,
  resetList,
  setSearchName,
  setError,
} = slice.actions;

export const pokemonList = (state: RootState) =>
  state.list.pokemonList.filter((item) =>
    item.name.toLowerCase().includes(state.list.searchName),
  );

export const fetching = (state: RootState) => state.list.fetching;

//TODO refactor below
let getListLocked = false;
export const getPokemonList = (url: string = 'pokemon/') => async (
  dispatch: Dispatch,
) => {
  if (getListLocked) {
    return;
  }
  getListLocked = true;
  dispatch(setFetchingStatus(true));
  clearQueue();
  dispatch(setPokemonList([]));
  try {
    const data: {
      results: PokemonBaseModel[];
      next: string;
    } = await fetchPokemonList(url);
    dispatch(setPokemonList(data.results));
    dispatch(setFetchingStatus(false));
  } catch (err) {
    dispatch(setError(true));
  }

  getListLocked = false;
};

export const getPokemonByTypeList = (url: string) => async (
  dispatch: Dispatch,
) => {
  if (getListLocked) {
    return;
  }
  getListLocked = true;
  clearQueue();
  dispatch(setPokemonList([]));
  dispatch(setFetchingStatus(true));
  try {
    const data: {
      pokemon: PokemonBaseModel[]; //TODO fix type
    } = await fetchPokemonList(url);

    dispatch(setPokemonList(data.pokemon.map((item) => item.pokemon)));
    dispatch(setFetchingStatus(false));
  } catch (err) {
    dispatch(setError(true));
  } finally {
    getListLocked = false;
  }
};

const fetchPokemonList = async (url: string) => {
  const { data } = await Api.request({
    method: 'GET',
    url,
    params: {
      limit: 1500,
    },
  });
  return data;
};

export default slice.reducer;
