import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { favoriteList } from '../redux/FavoritesSlice';
import { useSelector } from 'react-redux';
import { Pokemon } from '../components';

export const Favorites = () => {
  const list = useSelector(favoriteList);
  return (
    <FlatList
      data={list}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => <Pokemon pokemon={item} />}
      keyExtractor={(item, index) => `Favorite-${item.name}`}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
});

export default Favorites;
