import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StyleSheet, Text, View } from 'react-native';
//import { Login } from './src/pages/Login';
import { MainRoutes } from './src/routes/main.routes';

export default function App() {
  return (
    <NavigationContainer> 
      <MainRoutes/>
    </NavigationContainer>  
  )  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
