import { ImageRequireSource } from 'react-native';
import { Types } from '../../../models/Types.model';

const images: { [key in Types]: ImageRequireSource } = {
  bug: require('./bug.png'),
  dark: require('./dark.png'),
  dragon: require('./dragon.png'),
  electric: require('./electric.png'),
  fairy: require('./fairy.png'),
  fighting: require('./fighting.png'),
  fire: require('./fire.png'),
  flying: require('./flying.png'),
  ghost: require('./ghost.png'),
  grass: require('./grass.png'),
  ground: require('./ground.png'),
  ice: require('./ice.png'),
  normal: require('./normal.png'),
  poison: require('./poison.png'),
  psychic: require('./psychic.png'),
  rock: require('./rock.png'),
  steel: require('./steel.png'),
  water: require('./water.png'),
};

export default images;
