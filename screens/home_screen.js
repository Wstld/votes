/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Text, View, TextInput, Button, Modal, StyleSheet, useWindowDimensions, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginSlice } from '../redux/features/loginSlice';
import store from '../redux/store';

import { STATUS } from '../util/constants'
import firestore from '@react-native-firebase/firestore'
import { useEffect } from 'react';
import { useState } from 'react';
import { VoteHolder } from '../components/votesHolder';



const HomeScreen = (navigator) => {

  let dispatch = useDispatch();


  function onResult(Snap) {
    let addedData = Snap.data();
    dispatch(loginSlice.actions.setUserData(addedData));
  }

  function onErr(err) {
    console.log("from", err);
  }
  //add userData document if non exitent.
  useEffect(() => {
    if (user) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.exists) {

          }
          else {
            firestore()
              .collection('users')
              .doc(user.uid)
              .set({
                name: store.getState().login.name,
                id: user.uid,
                friends: [],
                voteFlags: [],
                email: user.email,
              });
          }
        });
        //subscribe to changes in users.
      const subscribe = firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot(onResult, onErr);
        //callback to remove listner.
      return subscribe;

    } else {
      dispatch(loginSlice.actions.reSetUser());
    }

  }, []);

  let user = useSelector(state => state.login.user);
  let data = useSelector(state => state.login.userData);

  const styles = StyleSheet.create({
    mainContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      marginTop: 40,
    }
  })

  
  return (
    <SafeAreaView style={styles.mainContainer}>
      {
        data != null ?
          <VoteHolder voteFlags={data.voteFlags} />
          :
          <Text>loading</Text>
      }

    </SafeAreaView>
  );
};

export default HomeScreen;