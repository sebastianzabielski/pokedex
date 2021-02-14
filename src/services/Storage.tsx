import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoritesModel } from '../models/Favorites.model';

export const getFavorites = async (): Promise<FavoritesModel> => {
  const favoritesJSON = await AsyncStorage.getItem('favorites');

  return favoritesJSON ? JSON.parse(favoritesJSON) : {};
};

export const setFavorites = async (favorites: FavoritesModel) => {
  return AsyncStorage.setItem('favorites', JSON.stringify(favorites));
};
