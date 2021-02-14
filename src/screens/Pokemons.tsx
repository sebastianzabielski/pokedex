import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Pokemon } from '../components';

import {
  getPokemonList,
  pokemonList,
  fetching,
} from '../redux/PokemonListSlice';
import { setList } from '../redux/FavoritesSlice';
import { loadTypes } from '../redux/PokemonTypesSlice';

import { useDispatch, useSelector } from 'react-redux';
import Filters from '../components/Filters';
import { getFavorites } from '../services/Storage';
import Loader from '../components/Loader';

export const Footer = () => {
  const isFetching = useSelector(fetching);

  if (isFetching) {
    return <Loader style={styles.loader} />;
  }

  return null;
};

export const Pokemons = React.memo(() => {
  const data = useSelector(pokemonList);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadStorageData = async () => {
      const favorites = await getFavorites();
      dispatch(setList(favorites));
    };

    loadStorageData();
    dispatch(getPokemonList());
    dispatch(loadTypes());
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style={'light'} />
      <Filters />
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => <Pokemon pokemon={item} />}
        keyExtractor={(item, index) => `Pokemons-${item.name}`}
        ListFooterComponent={<Footer />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  loader: {
    marginTop: 10,
  },
});

export default Pokemons;
