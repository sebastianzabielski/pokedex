import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import TypeImages from '../assets/images/types';
import { useNavigation } from '@react-navigation/native';
import Colors from '../styles/Colors';
import { useSelector, useDispatch } from 'react-redux';
import {
  pokemonDetails,
  getPokemonDetails,
} from '../redux/PokemonDetailsSlice';
import {
  isFavorite,
  addFavorite,
  removeFavorite,
  toggleFavorite,
} from '../redux/FavoritesSlice';
import { PokemonBaseModel } from '../models/Pokemon.model';
import Favorite from './Favorite';

const WIDTH = Dimensions.get('window').width / 3;

type PokemonProps = {
  pokemon: PokemonBaseModel;
};

export const Pokemon = React.memo(({ pokemon }: PokemonProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = useSelector((state) => pokemonDetails(state, pokemon.name));
  const favorite = useSelector((state) => isFavorite(state, pokemon.name));

  useEffect(() => {
    if (!data) {
      dispatch(getPokemonDetails(pokemon));
    }
  }, []);

  if (!data) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size={'large'} color={'red'} />
      </View>
    );
  }

  if (data.error) {
    return null; //TODO
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { pokemon })}
      style={styles.container}>
      <Text style={styles.orderText}>{data.order}</Text>

      <Favorite
        style={styles.favoriteIconContainer}
        active={favorite}
        onPress={() => dispatch(toggleFavorite(pokemon))}
        size={20}
      />
      <Image
        resizeMode={'contain'}
        style={styles.image}
        source={{
          uri: data.sprites.front_default,
        }}
      />

      <Text style={styles.nameText} numberOfLines={1}>
        {data.name}
      </Text>
      <View style={styles.typesContainer}>
        {data.types.map((item) => {
          return (
            <Image
              key={`PokemonType-${item.slot}`}
              style={styles.typeImage}
              resizeMode={'cover'}
              source={TypeImages[item.type.name]}
            />
          );
        })}
      </View>
    </TouchableOpacity>
  );
});

export default Pokemon;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '1%',
    width: '47%',
    flex: 1,
    height: WIDTH * 1.5,
    backgroundColor: Colors.component,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  orderText: {
    color: Colors.white,
    alignSelf: 'flex-start',
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 7,
    right: 7,
  },
  image: {
    width: '100%',
    height: (WIDTH * 1.5) / 2,
  },
  nameText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 5,
    textTransform: 'capitalize',
  },
  typesContainer: {
    flexDirection: 'row',
    marginTop: 7,
  },
  typeImage: {
    width: 20,
    height: 20,
  },
});
