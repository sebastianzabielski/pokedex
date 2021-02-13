import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { StackHeaderTitleProps } from '@react-navigation/stack';

const HeaderLogo = (props: StackHeaderTitleProps) => {
  return (
    <Image
      style={styles.image}
      resizeMode={'contain'}
      source={require(`../assets/images/pokemon_logo.png`)}
    />
  );
};

export default HeaderLogo;

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 50,
  },
});
