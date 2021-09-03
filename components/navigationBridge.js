
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { loginSlice, fbSignOut } from '../redux/features/loginSlice';

import HomeScreen from '../screens/home_screen';
import FriendsScreen from '../screens/friends_screen';
import AddQuestionScreen from '../screens/addQuestion_screen';
import LoginScreen from '../screens/login_screen';

import auth from '@react-native-firebase/auth'
import store from '../redux/store';
import VoteDetails from '../screens/voteDetails_screen';

import Ionicons from 'react-native-vector-icons/Ionicons'

const NavigationBridge = () => {
    //navigation bridge to get access to global states.

    //handel auth change event.
    function authChange(user) {

        if (!user || user === undefined) {
            dispatch(loginSlice.actions.reSetUser());
            dispatch(loginSlice.actions.setActiveUser(false));
        } else {
            if (user != store.getState().login.user) {
                dispatch(loginSlice.actions.setUser(user));
            }

            dispatch(loginSlice.actions.setActiveUser(true));
        }
    }

    useEffect(() => {
        console.log("navbridge")
        const authSubscribe = auth().onAuthStateChanged((user) => authChange(user));
        //callback to remove listner on unmount
        return authSubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    let activeUser = useSelector(state => state.login.activeUser);

    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator()

    let dispatch = useDispatch();

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: 'grey',
                    elevation: 3,
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                tabBarIcon: () => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home'
                    }
                    if (route.name === 'Friends') {
                        iconName = 'people'
                    }
                    if (route.name === 'AddQuestion') {
                        iconName = 'help'
                    }
                    return <Ionicons name={iconName} size={24} />
                },
            })}>
                {activeUser ? (
                    <Tab.Group>
                        <Tab.Screen name="Home" component={Home} options={({ navigation, route }) => ({
                            headerRight: () => (
                                <Button
                                    onPress={() => dispatch(fbSignOut())}
                                    title="logout"
                                    color="red"
                                />
                            ),
                        })} />
                        <Tab.Screen name="Friends" component={FriendsScreen} options={({ navigation, route }) => ({
                            headerRight: () => (
                                <Button
                                    onPress={() => dispatch(fbSignOut())}
                                    title="logout"
                                    color="red"
                                />
                            ),
                        })} />
                        <Tab.Screen name="AddQuestion" component={AddQuestionScreen} options={({ navigation, route }) => ({
                            headerRight: () => (
                                <Button
                                    onPress={() => dispatch(fbSignOut())}
                                    title="logout"
                                    color="red"
                                />
                            ),
                        })} />
                    </Tab.Group>
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

const Home = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={HomeScreen} />
            <Stack.Screen name="Details" component={VoteDetails} />
        </Stack.Navigator>
    );
}

export default NavigationBridge;
