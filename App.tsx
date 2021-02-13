import 'react-native-gesture-handler';
import React from 'react';
import {} from 'react-native';
import { Provider } from 'react-redux';

import store from './src/redux/Store';
import NavigationContainer from './src/navigators';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
};

export default App;
