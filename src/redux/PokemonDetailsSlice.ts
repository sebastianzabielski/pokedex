import { createSlice, Slice, Dispatch, createSelector } from '@reduxjs/toolkit';
import Api from '../services/Api';
import Store, { RootState } from './Store';

type State = {
  pokemonDetails: {
    [key: string]: {
      //TODO
    };
  };
};

const initialState: State = {
  pokemonDetails: {},
};

export const slice = createSlice({
  name: 'pokemonDetails',
  initialState,
  reducers: {
    setPokemon: (state, action) => {
      state.pokemonDetails[action.payload.name] = action.payload;
    },
  },
});

export const { setPokemon } = slice.actions;

export const pokemonDetails = (state: RootState, key: string) =>
  state.details.pokemonDetails[key];

export const getPokemonDetails = ({
  name,
  url,
}: {
  name: string;
  url: string;
}) => async (dispatch: Dispatch) => {
  const response = await Api.request({
    url,
    method: 'GET',
  });
  //TODO remove unused data
  dispatch(setPokemon(response.data));
};

export default slice.reducer;
