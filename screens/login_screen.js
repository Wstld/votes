import React from 'react';
import { Text, View, TextInput, Button, Modal, StyleSheet, useWindowDimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginSlice, loginWithEmail, createUserWithEmail} from '../redux/features/loginSlice';
import store from '../redux/store';
import { Sepparator } from '../components/sepparator';

import { STATUS } from '../util/constants'


const LoginScreen = (navigator) => {
  console.log("loaded");
  let dispatch = useDispatch();
  let modalOpen = useSelector(state => state.login.modalOpen);
  let { height, width } = useWindowDimensions();
  let status = useSelector(state => state.login.status);

  
  const createUser = () => {
    let password = store.getState().login.password;
    let username = store.getState().login.username;
   
    //Check username and password => firebase auth create user.
    //auth().createUserWithEmailAndPassword(username,password).then(() => { //sign in }).catch(error => { if .... })
    dispatch(createUserWithEmail({username:store.getState().login.username,password:store.getState().login.password}));
  };


  const styles = StyleSheet.create({
    modal: {
      backgroundColor: 'grey',
      width: width - 20,
      alignSelf: 'center',
      elevation: 3,
      borderRadius: 4,
      justifyContent: 'space-around',
      paddingTop: 20,
      paddingBottom: 20,
      marginTop:90,
    },
    headline: {
      textAlign: 'center',
      textAlignVertical: 'center',
      backgroundColor: 'white',
      flexGrow: 1,
      height: 40,
      elevation: 4
    },
    input: {
      height: 60,
      width: width - 50,
      backgroundColor: 'white',
      alignSelf: 'center',
      borderRadius: 10,
      fontSize: 15,
      paddingLeft: 15,
      margin: 15,
      color: 'black',
    },
    btn: {
      width: width / 2,
      alignSelf: 'center',
      marginTop: 15,

    },
    noAccount: {
      height: 40,
      padding:10,
      alignItems:'center',
    },
    container:{
      flexDirection:'column',
      justifyContent:'center',
      margin:25,
    },
  });

  
  

  if (status === STATUS.idle) {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalOpen}
        >
          <View style = {styles.modal}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={username => { dispatch(loginSlice.actions.setUsername(username)); }}
              defaultValue={store.getState().login.username}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={pass => { dispatch(loginSlice.actions.setPassword(pass)); }}

            />
            <View style={styles.btn}>
              <Button title="create" onPress={() => createUser()} />
              <Sepparator height = {6}/>
              <Button
                title="close"
                onPress={() => dispatch(loginSlice.actions.toggelModal())}
              />
            </View>
          </View>
        </Modal>

        <Text>Login</Text>
        <TextInput
          style= {styles.input}
          placeholder="Username"
          onChangeText={username => { dispatch(loginSlice.actions.setUsername(username)); }}
          defaultValue={store.getState().login.username}
        />
        <TextInput
          style= {styles.input}
          placeholder="Password"
          onChangeText={pass => { dispatch(loginSlice.actions.setPassword(pass)); }}
        />
        <Button title="login" onPress={() => { dispatch(loginWithEmail({ username: store.getState().login.username, password: store.getState().login.password })) }} />
        <TouchableOpacity style={styles.noAccount}
          onPress={() => dispatch(loginSlice.actions.toggelModal())}
        >
          <Text>Create account?</Text>
        </TouchableOpacity>

      </View>
    );

  } if (status === STATUS.loading) {
    return (
      <View style = {styles.container}>
        <ActivityIndicator size= "large" />
      </View>
    )
  }


};







export default LoginScreen;