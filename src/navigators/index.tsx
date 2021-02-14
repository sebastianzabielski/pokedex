import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import MainStack from './Main';
import Colors from '../styles/Colors';

export const Container = () => (
  <NavigationContainer
    theme={{
      dark: false,
      colors: {
        primary: Colors.gray,
        background: Colors.background,
        card: Colors.card,
        text: Colors.gray,
        border: Colors.card,
        notification: Colors.white,
      },
    }}>
    <MainStack />
  </NavigationContainer>
);

export default Container;
