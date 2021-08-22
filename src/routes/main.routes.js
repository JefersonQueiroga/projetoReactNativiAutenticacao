import React,{useContext} from 'react';
import { LoginRoutes } from './login.routes';
import { AppRoutes } from './app.routes'

export function MainRoutes(){

    // pegar informações do usuário logado.
    const user = false
    return user? <AppRoutes/> : <LoginRoutes/>;
}