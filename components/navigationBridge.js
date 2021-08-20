
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { loginSlice } from '../redux/features/loginSlice';

import HomeScreen from '../screens/home_screen';
import FriendsScreen from '../screens/friends_screen';
import AddQuestionScreen from '../screens/addQuestion_screen';
import LoginScreen from '../screens/login_screen';

const NavigationBridge = () => {

//navigation bridge to get access to global states.

    let activeUser = useSelector(state => state.login.activeUser);

    const Tab = createBottomTabNavigator();
    let dispatch = useDispatch();

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home" screenOptions={{
                headerStyle: {
                    backgroundColor: 'grey',
                    elevation: 3,
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerRight: () => (
                    <Button
                        onPress={() => dispatch(loginSlice.actions.toggelActiveUser()) }
                        title="Press"
                        color="Green"

                    />
                ),
            }}>
                {activeUser ? (
                <>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Friends" component={FriendsScreen} />
                <Tab.Screen name="AddQuestion" component={AddQuestionScreen} />
                </>
                ) :
                (
                    <>
                    <Tab.Screen name="Login" component={LoginScreen} />
                    </>
                )
                }

            </Tab.Navigator>


        </NavigationContainer>

    );
};

export default NavigationBridge;
