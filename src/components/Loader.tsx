import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ActivityIndicatorProps,
} from 'react-native';

const Loader = (props: ActivityIndicatorProps) => {
  return <ActivityIndicator size={'small'} color={'red'} {...props} />;
};

export default Loader;
