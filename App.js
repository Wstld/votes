/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import NavigationBridge from './components/navigationBridge';
import { Button } from 'react-native';




const App = () => {
  return (
    <Provider store={store}>
      <NavigationBridge/>
    </Provider>
  );
};



export default App;
