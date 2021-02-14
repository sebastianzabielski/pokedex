import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainNavigatorParamList } from '../navigators/Main';
import { RouteProp } from '@react-navigation/native';

type DetailsScreenRouteProp = RouteProp<MainNavigatorParamList, 'Details'>;

type DetailsScreenNavigationProp = StackNavigationProp<
  MainNavigatorParamList,
  'Details'
>;

type DetailsProps = {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
};

export const Details = (props: DetailsProps) => {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
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

export default Details;
