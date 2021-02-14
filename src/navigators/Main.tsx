import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './Tab';

import { Details } from '../screens';
import { HeaderLogo } from '../components';
import { PokemonBasicModel } from '../models/Pokemon.model';

export type MainNavigatorParamList = {
  Home: undefined;
  Details: {
    pokemon: PokemonBasicModel;
  };
};

const Stack = createStackNavigator<MainNavigatorParamList>();

export const Main = () => (
  <Stack.Navigator
    screenOptions={{ headerTitle: (props) => <HeaderLogo {...props} /> }}>
    <Stack.Screen name="Home" component={TabNavigator} />
    <Stack.Screen
      name="Details"
      component={Details}
      options={{ headerTitleAlign: 'center' }}
    />
  </Stack.Navigator>
);

export default Main;
