import { createSlice, Dispatch } from '@reduxjs/toolkit';
import Api from '../services/Api';
import Store, { RootState } from './Store';
import { PokemonDetailsModel } from '../models/Details.model';
import { PokemonBaseModel } from '../models/Pokemon.model';

type State = {
  pokemonDetails: {
    [key: string]: PokemonDetailsModel &
      ({ error: boolean } & PokemonBaseModel);
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

let queue: (() => Promise<void>)[] = [];

export const clearQueue = () => {
  queue = [];
};

let queueDuringExecution = false;
export const getPokemonDetails = ({
  name,
  url,
}: {
  name: string;
  url: string;
}) => async (dispatch: Dispatch) => {
  queue.push(async () => {
    if (!Store.getState().details.pokemonDetails[name]) {
      try {
        const response = await Api.request({
          url,
          method: 'GET',
        });
        dispatch(setPokemon(response.data));
      } catch (err) {
        dispatch(setPokemon({ url, name, error: true }));
      }
    }
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
