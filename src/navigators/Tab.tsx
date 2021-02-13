import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pokemons, Favorites } from '../screens';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Pokemons" component={Pokemons} />
    <Tab.Screen name="Favorites" component={Favorites} />
  </Tab.Navigator>
);

export default TabNavigator;
