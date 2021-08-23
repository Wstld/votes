import React from 'react';
import { Text, View, TextInput, Button, Modal, StyleSheet, useWindowDimensions, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginSlice } from '../redux/features/loginSlice';
import store from '../redux/store';

import { STATUS } from '../util/constants'
import firestore from '@react-native-firebase/firestore'
import { useEffect } from 'react';



const HomeScreen = (navigator) => {
  let user = useSelector(state => state.login.user);
  let dispatch = useDispatch()

  function onResult(Snap) {
    console.log("data:", Snap.data())
  }

  function onErr(err) {
    console.log("from", err);
  }

  useEffect(() => {

    if (user) {
      console.log(user.uid)
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            return
          }
          else {
            firestore()
              .collection('users')
              .doc(user.uid)
              .set({ name: user.email })
          }
        })

      const subscribe = firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot(onResult, onErr);

      return subscribe;

    } else {
      dispatch(loginSlice.actions.reSetUser());
    }

  }, [user, dispatch]);

  return (
    <View>
      <Text>Home</Text>
    </View>

  );
}

export default HomeScreen;