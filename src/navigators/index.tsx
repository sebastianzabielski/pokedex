import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import MainStack from './Main';

export const Container = () => (
  <NavigationContainer
    theme={{
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: 'red', //TODO set default theme
      },
    }}>
    <MainStack />
  </NavigationContainer>
);

export default Container;
