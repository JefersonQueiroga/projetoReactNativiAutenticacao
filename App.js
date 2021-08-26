import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StyleSheet, Text, View } from 'react-native';
//import { Login } from './src/pages/Login';
import { MainRoutes } from './src/routes/main.routes';
import { useAuth,AuthProvider } from './src/context/Auth';

import AppLoading from 'expo-app-loading';

export default function App() {
  return (
    <NavigationContainer> 
      <AuthProvider>
        <MainRoutes/>
      </AuthProvider>
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
