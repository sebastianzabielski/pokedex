import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  typesList,
  selected,
  select as selectType,
} from '../redux/PokemonTypesSlice';
import { getPokemonByTypeList } from '../redux/PokemonListSlice';
import { PokemonBaseModel } from '../models/Pokemon.model';
import Colors from '../styles/Colors';

type TypeListItemComponentProps = {
  type: PokemonBaseModel;
  isSelected: boolean;
  onPress: () => void;
};

const TypeListItem = ({
  type,
  isSelected,
  onPress,
}: TypeListItemComponentProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.listComponentContainer,
        isSelected && styles.selectedListComponentContainer,
      ]}
      onPress={onPress}>
      <Text style={styles.itemText}>{type.name}</Text>
    </TouchableOpacity>
  );
};

const TypePicker = () => {
  const types = useSelector(typesList);
  const selectedName = useSelector(selected);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Type</Text>
      <FlatList
        data={types}
        showsVerticalScrollIndicator={false}
        bounces={false}
        renderItem={({ item, index }) => (
          <TypeListItem
            type={item}
            onPress={() => {
              dispatch(selectType(item.name));
              dispatch(getPokemonByTypeList(item.url));
            }}
            isSelected={selectedName === item.name}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default TypePicker;

const styles = StyleSheet.create({
  container: {
    maxHeight: 150,
    width: '100%',
    paddingVertical: 10,
  },
  title: {
    color: Colors.white,
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  listComponentContainer: {
    width: '100%',
    padding: 5,
    borderRadius: 8,
  },
  selectedListComponentContainer: {
    backgroundColor: Colors.background,
  },
  itemText: {
    color: Colors.white,
  },
});
