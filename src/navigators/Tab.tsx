import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pokemons, Favorites } from '../screens';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import Translation from '../services/Translation';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      style: styles.tabBar,
      labelStyle: styles.label,
    }}>
    <Tab.Screen
      name="Pokemons"
      component={Pokemons}
      options={{
        tabBarLabel: Translation.pokemons,
        tabBarIcon: (props) => <Entypo {...props} name="home" />,
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={Favorites}
      options={{
        tabBarLabel: Translation.favorites,
        tabBarIcon: (props) => <FontAwesome {...props} name="star" />,
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    paddingBottom: 3,
  },
  label: {
    textTransform: 'capitalize',
  },
});
