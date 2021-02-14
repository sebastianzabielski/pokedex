import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Pokemon } from '../components';
import Api from '../services/Api';

import {
  getPokemonList,
  pokemonList,
  clearStore,
  fetching,
} from '../redux/PokemonListSlice';
import { setList, addFavorite } from '../redux/FavoritesSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Footer = () => {
  const isFetching = useSelector(fetching);

  if (isFetching) {
    return (
      <View style={{ marginTop: 10 }}>
        <ActivityIndicator size={'small'} color={'red'} />
      </View>
    );
  }

  return null;
};

export const Pokemons = React.memo(() => {
  const data = useSelector(pokemonList);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadStorageData = async () => {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        dispatch(setList(JSON.parse(favorites)));
      }
    };

    loadStorageData();
    dispatch(getPokemonList());
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style={'light'} />
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 10,
          paddingBottom: 30,
        }}
        renderItem={(item) => <Pokemon item={item.item} />}
        keyExtractor={(item, index) => '' + index} //TODO Change
        onEndReached={() => dispatch(getPokemonList())}
        ListFooterComponent={<Footer />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Pokemons;
