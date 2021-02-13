import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './Tab';

import { Details } from '../screens';

const Stack = createStackNavigator();

export const Main = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={TabNavigator} />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);

export default Main;
