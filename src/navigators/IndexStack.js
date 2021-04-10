import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/Splash';
import Nicks from '../screens/Nicks';
import MyNumber from '../screens/MyNumber';
import RunTft from '../screens/RunTft';
import {enableScreens} from 'react-native-screens';

enableScreens();
const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SplashScreen" component={Splash} />
      <Stack.Screen name="MyNumber" component={MyNumber} />
      <Stack.Screen name="Nicks" component={Nicks} />
      <Stack.Screen name="RunTft" component={RunTft} />
    </Stack.Navigator>
  );
};
