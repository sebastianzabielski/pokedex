import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ActivityIndicatorProps,
} from 'react-native';
import Colors from '../styles/Colors';

const Loader = (props: ActivityIndicatorProps) => {
  return <ActivityIndicator size={'small'} color={Colors.white} {...props} />;
};

export default Loader;
