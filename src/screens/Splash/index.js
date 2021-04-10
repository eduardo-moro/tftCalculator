import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

// render-area:
export default props => {
  // state-area:
  useEffect(() => {
    setTimeout(() => {
      props.navigation.reset({
        index: 0,
        routes: [{name: 'MyNumber'}],
      });
    }, 250);
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>TFT</Text>
      <ActivityIndicator size="large" color="#48f" />
    </View>
  );
};

// styled-area:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 42,
    color: '#333',
    fontFamily: 'Aria-classic',
  },
});
