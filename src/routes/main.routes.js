import React,{useContext} from 'react';
import { LoginRoutes } from './login.routes';
import { AppRoutes } from './app.routes'
import { useAuth } from '../context/Auth';
import Teste from '../pages/Teste'

export function MainRoutes(){

    const {user}= useAuth()
    console.log("Valor do user:" + user.name);
    return user.name ? <AppRoutes/>: <LoginRoutes/>;
  
}