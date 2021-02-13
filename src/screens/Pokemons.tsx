import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Pokemons = () => {
  return (
    <View style={styles.container}>
      <Text>Pokemons Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Pokemons;
