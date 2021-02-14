import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { AntDesign } from '@expo/vector-icons';

import Colors from '../styles/Colors';
import { useDispatch } from 'react-redux';
import { setSearchName } from '../redux/PokemonListSlice';
import TypePicker from './TypePicker';

type HeaderProps = {
  onPress: () => void;
  collapsed: boolean;
};

const Header = ({ onPress, collapsed }: HeaderProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.headerContainer}>
      <Text style={styles.headerText}>Filter</Text>
      <AntDesign
        name={collapsed ? 'up' : 'down'}
        size={20}
        color={Colors.white}
      />
    </TouchableOpacity>
  );
};

const Filters = () => {
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Header onPress={() => setCollapsed(!collapsed)} collapsed={collapsed} />
      <Collapsible style={styles.collapsibleContainer} collapsed={collapsed}>
        <View style={styles.lineSeparator} />
        <TextInput
          style={styles.input}
          placeholder={'Search by name'}
          placeholderTextColor={Colors.gray}
          onChangeText={(text: string) => {
            dispatch(setSearchName(text));
          }}
        />
        <TypePicker />
      </Collapsible>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.component,
    margin: 9,
    borderRadius: 8,
    marginBottom: 5,
    elevation: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    color: Colors.white,
    fontSize: 17,
  },
  collapsibleContainer: {
    marginHorizontal: 10,
  },
  lineSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.background,
  },
  input: {
    marginTop: 10,
    backgroundColor: Colors.background,
    padding: 5,
    borderRadius: 8,
    color: 'white',
  },
});
