import React from 'react';
import IndexStack from './navigators/IndexStack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {StyleSheet, Text} from 'react-native';

export default () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <IndexStack />
      </NavigationContainer>
    </PaperProvider>
  );
};
const styles = StyleSheet.create({});
