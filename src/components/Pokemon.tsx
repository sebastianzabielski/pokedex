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
import {} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Colors from '../styles/Colors';
import { useSelector, useDispatch } from 'react-redux';
import {
  pokemonDetails,
  getPokemonDetails,
} from '../redux/PokemonDetailsSlice';

const WIDTH = Dimensions.get('window').width / 3;

export const Pokemon = React.memo(
  (props: {
    item: {
      name: string;
      url: string;
    };
  }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const data = useSelector((state) => pokemonDetails(state, props.item.name));

    useEffect(() => {
      if (!data) {
        dispatch(getPokemonDetails(props.item));
      }
    }, []);

    if (!data) {
      return (
        <View style={[styles.container, { justifyContent: 'center' }]}>
          <ActivityIndicator size={'large'} color={'red'} />
        </View>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Details')}
        style={styles.container}>
        <Text style={{ color: Colors.white, alignSelf: 'flex-start' }}>
          {data.order}
        </Text>
        <Image
          // style={{ maxWidth: WIDTH, maxHeight: 100, backgroundColor: 'purple' }}
          // resizeMode={'contain'}
          resizeMode={'contain'}
          style={{ width: '100%', height: (WIDTH * 1.5) / 2 }}
          source={{
            uri: data.sprites.front_default,
          }}
        />

        <Text
          style={{
            color: Colors.white,
            fontWeight: 'bold',
            fontSize: 12,
            marginTop: 5,
          }}>
          {`${data.order}-${data.name}`}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 7 }}>
          {data.types.map((item) => {
            return (
              <Image
                key={`PokemonType-${item.slot}`}
                style={{ width: 20, height: 20 }}
                resizeMode={'cover'}
                source={TypeImages[item.type.name]}
              />
            );
          })}
        </View>
      </TouchableOpacity>
    );
  },
);

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
});
