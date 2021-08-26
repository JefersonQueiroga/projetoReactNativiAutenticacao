import React, { createContext,
    useContext, 
    useState,
    useEffect} from 'react';
import { Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/Api';

const AuthContext = createContext();

function AuthProvider({children}){
    const [user,setUser] = useState({});
    const [userLoading, setUserLoading] = useState(true);

    const userStorageKey = '@ifrndo:user';

    async function signWithSUAP(matricula, password){
        var params = new URLSearchParams();
        params.append('username', matricula);
        params.append('password', password);

        try{
            const response =  await api.post('autenticacao/token/', params );
            const { token } = response.data;

            const responseUser =  await api.get('/minhas-informacoes/meus-dados/', { 
                headers:{
                    'authorization': 'jwt ' + token,
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'    
                }
            } );
           
            const {id,nome_usual, email,url_foto_75x100} = responseUser.data;
            
            const userLogged = {
                id: id,
                email,
                name:nome_usual,
                photo: 'https://suap.ifrn.edu.br/' + url_foto_75x100,
                type: "suap"                
            }
            setUser(userLogged);
            await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));

            console.log(userLogged);

        }catch(error){
            console.log(error);
        }
    }

    /**
     * Login use Google
     */
    async function signWithGoogle(){
        try{
        const {CLIENT_ID} = process.env;
        const {REDIRECT_URI}= process.env;
        const RESPONSE_TYPE='token'
        const SCOPE = encodeURI('profile email')
        const authUrl =`https://accounts.google.com/o/oauth2/v2/auth?client_id=${ CLIENT_ID }&redirect_uri=${ REDIRECT_URI }&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
        
    
        const {type,params} = await AuthSession.startAsync({ authUrl }) 
        console.log(type);    
      
        if(type==='success'){
       
            const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
            const userInfo = await response.json();
          
            const userLogged = {
                id: userInfo.id,
                email: userInfo.email,
                name: userInfo.name,
                photo: userInfo.picture,
                type: "google"                
            }

            setUser(userLogged);
            await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));

            console.log(userLogged);
        }
        
        }catch(error){
            Alert.alert("Error na autenticação do Google.");
        }    
    }


    //**Função para apagar usuário  */
    async function logout(){
        setUser({});
        await AsyncStorage.removeItem(userStorageKey);
    }

    useEffect(() => {
        async function loadUserStorageDate() {
          const userStoraged = await AsyncStorage.getItem(userStorageKey);
          
          if(userStoraged){
            const userLogged = JSON.parse(userStoraged);
            setUser(userLogged);
          }
        }
        
        loadUserStorageDate();
        setUserLoading(false);
      },[]);

    return(
        <AuthContext.Provider value={{user,signWithGoogle,signWithSUAP,logout,userLoading}}>
            { children }
        </AuthContext.Provider>
        
    )
}

function useAuth(){
    const context= useContext(AuthContext);
  
    return context;
  }
  
  export { AuthProvider, useAuth }