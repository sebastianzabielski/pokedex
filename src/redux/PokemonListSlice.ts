import { createSlice, Slice, Dispatch, createSelector } from '@reduxjs/toolkit';
import Api from '../services/Api';
import Store, { RootState } from './Store';

type State = {
  pokemonList: {
    name: string;
    url: string;
  }[];
  next: string;
  prev: string;
  fetching: boolean;
};

const initialState: State = {
  pokemonList: [],
  next: 'pokemon/',
  prev: '',
  fetching: false,
};

export const slice = createSlice({
  name: 'pokemonList',
  initialState,
  reducers: {
    setNext: (state, action) => {
      state.next = action.payload;
    },
    setPokemonList: (state, action) => {
      state.pokemonList = [...state.pokemonList, ...action.payload];
    },
    clearStore: (state) => {
      state = initialState;
    },
    setFetchingStatus: (state, action) => {
      state.fetching = action.payload;
    },
  },
});

export const {
  setNext,
  setPokemonList,
  clearStore,
  setFetchingStatus,
} = slice.actions;

export const pokemonList = (state: RootState) => state.list.pokemonList;

export const fetching = (state: RootState) => state.list.fetching;

let getListLocked = false;
export const getPokemonList = () => async (dispatch: Dispatch) => {
  if (getListLocked) {
    return;
  }
  getListLocked = true;
  dispatch(setFetchingStatus(true));
  const data = await fetchPokemonList();
  dispatch(setNext(data.next));
  dispatch(setPokemonList(data.data));
  dispatch(setFetchingStatus(false));
  getListLocked = false;
};

const fetchPokemonList = async () => {
  const { data } = await Api.request({
    method: 'GET',
    url: Store.getState().list.next,
  });
  return {
    next: data.next,
    prev: data.previous,
    data: data.results,
  };
};

export default slice.reducer;
