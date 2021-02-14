import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../styles/Colors';

const Favorite = ({
  style,
  active,
  onPress,
  size,
}: {
  style: StyleProp<ViewStyle>;
  active: boolean;
  onPress: () => void;
  size?: number;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
      hitSlop={{ top: 7, bottom: 10, left: 10, right: 7 }}>
      {active ? (
        <FontAwesome name="star" size={size || 24} color={Colors.yellow} />
      ) : (
        <FontAwesome name="star-o" size={size || 24} color={Colors.yellow} />
      )}
    </TouchableOpacity>
  );
};

export default Favorite;
