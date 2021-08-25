/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Text, View, TextInput, Button, Modal, StyleSheet, useWindowDimensions, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginSlice } from '../redux/features/loginSlice';
import store from '../redux/store';

import { STATUS } from '../util/constants'
import firestore from '@react-native-firebase/firestore'
import { useEffect } from 'react';
import { useState } from 'react';
import { VoteHolder } from '../components/votesHolder';



const HomeScreen = (navigator) => {
  let user = useSelector(state => state.login.user);
  let data = useSelector(state => state.login.userData);

  const [status, setStatus] = useState(STATUS.loading);
  let dispatch = useDispatch();


  function onResult(Snap) {
    let addedData = Snap.data();
    console.log('data:', addedData);
    dispatch(loginSlice.actions.setUserData(addedData));
    setStatus(STATUS.idle);
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
            return;
          }
          else {
            firestore()
              .collection('users')
              .doc(user.uid)
              .set({
                name: user.email, votes: [
                  {
                    "title": "Wanna do something?",
                    "description": "desc of the question asked",
                    "id": "WWfk2-Wanna_Do_Something",
                    "options": [
                      "1",
                      "2",
                      "3"
                    ],
                    "vote": {
                      "result": {
                        "1": 1,
                        "2": 0,
                        "3": 0,
                        "4": 2
                      },
                      "voters": [
                        {
                          "id": "trSVTiVbbAe34hS8WmcbV3EWWfk2",
                          "voted": false
                        },
                        {
                          "id": "some id",
                          "voted": true
                        }
                      ]
                    }
                  },
                  {
                    "title": "Wanna do this?",
                    "description": "desc of the question asked",
                    "id": "WWfk2-Wanna_Do_This",
                    "options": [
                      "1",
                      "2",
                      "3"
                    ],
                    "vote": {
                      "result": {
                        "1": 1,
                        "2": 0,
                        "3": 0,
                        "4": 2
                      },
                      "voters": [
                        {
                          "id": "trSVTiVbbAe34hS8WmcbV3EWWfk2",
                          "voted": false
                        },
                        {
                          "id": "some id",
                          "voted": true
                        }
                      ]
                    }
                  },
                  {
                    "title": "Wanna do this then?",
                    "description": "desc of the question asked",
                    "id": "WWfk2-Wanna_Do_This",
                    "options": [
                      "1",
                      "2",
                      "3"
                    ],
                    "vote": {
                      "result": {
                        "1": 1,
                        "2": 0,
                        "3": 0,
                        "4": 2
                      },
                      "voters": [
                        {
                          "id": "trSVTiVbbAe34hS8WmcbV3EWWfk2",
                          "voted": false
                        },
                        {
                          "id": "some id",
                          "voted": true
                        }
                      ]
                    }
                  }
                ],
              });
          }
        });

      const subscribe = firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot(onResult, onErr);
      console.log("USER2")
      return subscribe;

    } else {
      dispatch(loginSlice.actions.reSetUser());
    }

  }, [user]);

  const styles = StyleSheet.create({
    mainContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      marginTop: 40,
    }
  })
  return (
    <View style={styles.mainContainer}>
      {
        status === STATUS.loading ?
          <Text>Loading</Text>
          : data != null ?
            <VoteHolder votes={data.votes} />
            :
            <Text>Some thing went wrong</Text>
      }

    </View>
  );
};

export default HomeScreen;