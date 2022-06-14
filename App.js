import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import Navigation from './src/navigation/Navigation';
import {AuthProvider} from './src/context/AuthContext';
import Routes from './src/navigation/Routes';

const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
