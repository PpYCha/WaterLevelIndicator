import {StyleSheet, Text, View, Alert} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import GuestScreen from '../screens/GuestScreen';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GuestScreen"
          component={GuestScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
