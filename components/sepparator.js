import React from 'react';
import {  View,StyleSheet } from 'react-native';




export const Sepparator = ({height}) => {
    const styles = StyleSheet.create({
        sepparator:{
          marginVertical: height,
          borderBottomColor: '#737373',
        },
    });

    return (
      <View style={styles.sepparator} />
    );
  };