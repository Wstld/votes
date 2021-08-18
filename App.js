/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/home_screen';
import LoginScreen from './screens/login_screen';
import AddQuestionScreen from './screens/addQuestion_screen';
import FriendsScreen from './screens/friends_screen';


const App = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
      
       <Tab.Navigator initialRouteName = "Home" >
        <Tab.Screen name= "Home"  component = {HomeScreen}/>
        <Tab.Screen name= "Login"  component = {LoginScreen}/>
        <Tab.Screen name= "Friends"  component = {FriendsScreen}/>
        <Tab.Screen name= "AddQuestion"  component = {AddQuestionScreen}/>
       </Tab.Navigator>


      </NavigationContainer>
    </Provider>
  );

};

export default App;
