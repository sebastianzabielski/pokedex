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

type TypeDetails = {
  pokemon: { pokemon: PokemonBaseModel }[];
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
    item.name.toLowerCase().includes(state.list.searchName.toLowerCase()),
  );

export const fetching = (state: RootState) => state.list.fetching;

let getListLocked = false;
const getPokemonListDecorator = async (
  dispatch: Dispatch,
  fetchData: () => Promise<PokemonBaseModel[]>,
) => {
  if (getListLocked) {
    return;
  }
  getListLocked = true;
  dispatch(setFetchingStatus(true));
  clearQueue();
  dispatch(setPokemonList([]));
  try {
    const data = await fetchData();
    dispatch(setPokemonList(data));
    dispatch(setFetchingStatus(false));
  } catch (err) {
    dispatch(setError(true));
  }

  getListLocked = false;
};

export const getPokemonList = (url: string = 'pokemon/') => async (
  dispatch: Dispatch,
) => {
  const fetchMethod = async () => {
    const data: {
      results: PokemonBaseModel[];
    } = await fetchPokemonList(url);
    return data.results;
  };

  getPokemonListDecorator(dispatch, fetchMethod);
};

export const getPokemonByTypeList = (url: string) => async (
  dispatch: Dispatch,
) => {
  const fetchMethod = async () => {
    const data: TypeDetails = await fetchPokemonList(url);
    return data.pokemon.map((item) => item.pokemon);
  };
  getPokemonListDecorator(dispatch, fetchMethod);
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
