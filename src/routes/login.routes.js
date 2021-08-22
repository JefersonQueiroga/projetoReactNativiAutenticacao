import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import { Login } from '../pages/Login';

const LoginStack = createStackNavigator();


// rotas para os usuários não logados

export function LoginRoutes(){
    return(
        <LoginStack.Navigator screenOptions={{ headerShown: false}}>
            <LoginStack.Screen name="Login" component={Login}/>
        </LoginStack.Navigator>
    )
}