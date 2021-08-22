 import React,{ useState} from 'react'
import { View,
    StyleSheet, 
    Text,
    Image, 
    TouchableOpacity,
    Alert} from 'react-native';
import Logo from '../assets/logo.png';
import api from '../services/Api';
import { Input } from '../components/Input';
import { AntDesign } from '@expo/vector-icons'; 
import * as AuthSession from 'expo-auth-session';

export function Login(){
    const [matricula, setMatricula] = useState('');
    const [password, setPassword] = useState('');

    
    async function handleSignWithGoogle(){
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
                photo: userInfo.picture                
            }

            console.log( userLogged );
        }
        
        }catch(error){
            Alert.alert("Error na autenticação do Google.");
        }    
    }

    /**
     * Função para realizar chamada ao suap
     */
    async function handleLogin(){
        
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

            console.log(responseUser.data);
        }catch{
            Alert.alert("Erro na autenticação");
        }
    }



    return(
        <View style={styles.container}>
             <View>
                 <Image source={Logo} style={styles.image}/>   
             </View>
             <Text style={styles.title}>IFRN.DO</Text>
             
             <View style={styles.form}>
                <Input placeholder="Matrícula" onChangeText={x => setMatricula(x)} />
                <Input placeholder="Senha" secureTextEntry={true} onChangeText={x => setPassword(x)}/>
                <TouchableOpacity style={styles.styleButton} onPress={ handleLogin }>
                    <Text style={styles.textButton}>Entrar</Text>
                </TouchableOpacity>
             </View>
                          
            <TouchableOpacity style={ styles.buttonGoogleSocial  } onPress={handleSignWithGoogle}> 
                <AntDesign name="google" size={30} color="#FEFEFE" />
                <Text style={styles.textButtonGoogle}>Login com Google</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1DB863',
        alignItems: 'center',
        paddingTop: 70,
    },
    title:{
        color: '#FEFEFE',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 25,
    },
    image:{
        width: 100,
        height: 130
    },
    form:{
        width: "80%",
    },
    styleButton:{
        height: 60,
        backgroundColor:'#666666',
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    textButton:{
        color: '#FEFEFE',
        fontSize:20,
    },
    buttonGoogleSocial:{
        marginTop: 50,
        width: '80%',
        height:65,
        backgroundColor:'#202020',
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textButtonGoogle:{
        color: '#F2F2F2',
        fontSize: 22,
    }
});