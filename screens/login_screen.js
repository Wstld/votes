import React from 'react';
import { Text, View, TextInput, Button, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginSlice } from '../redux/features/loginSlice';

const LoginScreen = (navigator) => {
  let dispatch = useDispatch();
  let modalOpen = useSelector(state => state.login.modalOpen);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
      >
        <View>
          <TextInput
            placeholder="Username"
          />
          <TextInput
            placeholder="Password"
          />
          <Button title="create" />
          <Button title="close" />
        </View>
      </Modal>

      <Text>Login</Text>
      <TextInput
        placeholder="Username"
      />
      <TextInput
        placeholder="Password"
      />
      <Button title="login" />
      <Text>No account?</Text>
    </View>

  );


};

export default LoginScreen;