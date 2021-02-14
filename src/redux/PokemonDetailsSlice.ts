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
    addPokemons: (state, action) => {
      state.pokemonDetails = { ...state.pokemonDetails, ...action.payload };
    },
  },
});

export const { setPokemon, addPokemons } = slice.actions;

export const pokemonDetails = (state: RootState, key: string) =>
  state.details.pokemonDetails[key];

const queue: (() => Promise<void>)[] = [];

let queueDuringExecution = false;
export const getPokemonDetails = ({
  name,
  url,
}: {
  name: string;
  url: string;
}) => async (dispatch: Dispatch) => {
  queue.push(async () => {
    //TODO try catch

    const response = await Api.request({
      url,
      method: 'GET',
    });
    //TODO remove unused data

    //TODO execute as async
    dispatch(setPokemon(response.data));
  });

  if (queueDuringExecution) {
    return;
  }

  queueDuringExecution = true;
  while (queue.length > 0) {
    const callback = queue.shift();
    callback && (await callback());
  }
  queueDuringExecution = false;
};

export default slice.reducer;
