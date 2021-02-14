import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainNavigatorParamList } from '../navigators/Main';
import { RouteProp } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { pokemonDetails } from '../redux/PokemonDetailsSlice';
import { isFavorite, toggleFavorite } from '../redux/FavoritesSlice';
import TypeImages from '../assets/images/types';
import Colors from '../styles/Colors';
import { FlatList } from 'react-native-gesture-handler';
import Translation from '../services/Translation';
import Favorite from '../components/Favorite';
import { PokemonDetailsStatsModel } from '../models/Details.model';
import { RootState } from '../redux/Store';

const WIDTH = Dimensions.get('window').width;

type DetailsScreenRouteProp = RouteProp<MainNavigatorParamList, 'Details'>;

type DetailsScreenNavigationProp = StackNavigationProp<
  MainNavigatorParamList,
  'Details'
>;

type DetailsProps = {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
};

export const Details = ({ route }: DetailsProps) => {
  const dispatch = useDispatch();

  const pokemon = useSelector((state) =>
    pokemonDetails(state as RootState, route.params.pokemon.name),
  );
  const favorite = useSelector((state) =>
    isFavorite(state as RootState, route.params.pokemon.name),
  );

  const renderItem = useCallback(
    ({ item }: { item: PokemonDetailsStatsModel }) => (
      <View style={styles.columnListItemContainer}>
        <Text style={styles.typeText}>{Translation[item.stat.name]}</Text>
        <Text style={styles.baseStatText}>{item.base_stat}</Text>
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={{ uri: pokemon.sprites.front_default }}
          resizeMode={'contain'}
          style={styles.mainImage}
        />
        <View style={styles.headerDataContainer}>
          <Text style={styles.titleText}>{pokemon.name}</Text>
          <View style={styles.typesContainer}>
            {pokemon.types.map((item) => {
              return (
                <View
                  key={`PokemonTypeDetails-${item.slot}`}
                  style={styles.typeItemContainer}>
                  <Image
                    style={styles.typeImage}
                    resizeMode={'cover'}
                    source={TypeImages[item.type.name]}
                  />
                  <Text style={styles.typeText}>{item.type.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <Favorite
          style={styles.favorite}
          active={favorite}
          onPress={() => dispatch(toggleFavorite(route.params.pokemon))}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.statsContainer}>
          <Text style={[styles.titleText, styles.sectionText]}>statistics</Text>
          <FlatList
            data={pokemon.stats}
            numColumns={3}
            columnWrapperStyle={styles.columnList}
            keyExtractor={(item) => `PokemonStat-${item.stat.name}`}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  typeImage: {
    width: 20,
    height: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.component,
    margin: 10,
    borderRadius: 8,
    padding: 5,
  },
  mainImage: {
    width: WIDTH / 2,
    height: WIDTH / 2,
    flex: 1,
  },
  titleText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  typesContainer: {
    marginTop: 5,
  },
  typeItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  typeText: {
    marginLeft: 3,
    color: Colors.white,
    opacity: 0.5,
    textTransform: 'capitalize',
  },
  headerDataContainer: {
    flex: 1,
  },
  favorite: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  statsContainer: {
    width: '100%',
    paddingBottom: 5,
  },
  sectionText: {
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  columnList: {
    justifyContent: 'space-around',
  },
  columnListItemContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 10,
  },
  baseStatText: {
    color: Colors.white,
  },
});

export default Details;
