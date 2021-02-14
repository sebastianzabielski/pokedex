import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { RootState } from './Store';
import { PokemonBaseModel } from '../models/Pokemon.model';
import Api from '../services/Api';
import { getPokemonByTypeList, getPokemonList } from './PokemonListSlice';
type State = {
  list: PokemonBaseModel[];
  selected: string;
  error: boolean;
};

const initialState: State = {
  list: [],
  selected: 'all',
  error: false,
};

export const slice = createSlice({
  name: 'types',
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = [{ name: 'all', url: 'pokemon/' }, ...action.payload];
    },
    select: (state, action) => {
      state.selected = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setList, select, setError } = slice.actions;

export const selectType = (pokemon: PokemonBaseModel) => async (
  dispatch: Dispatch<any>,
) => {
  dispatch(select(pokemon.name));
  dispatch(
    pokemon.name === 'all'
      ? getPokemonList(pokemon.url)
      : getPokemonByTypeList(pokemon.url),
  );
};

export const loadTypes = () => async (dispatch: Dispatch) => {
  try {
    const response = await Api.request({
      method: 'GET',
      url: 'type/',
    });
    dispatch(setList(response.data.results));
  } catch (err) {
    dispatch(setError(true));
  }
};

export const selected = (state: RootState) => state.types.selected;
export const typesList = (state: RootState) => state.types.list;
export const fetchTypesError = (state: RootState) => state.types.error;

export default slice.reducer;
