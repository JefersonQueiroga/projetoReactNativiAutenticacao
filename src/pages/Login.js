 import React,{ useState} from 'react'
import { View,
    StyleSheet, 
    Text,
    Image, 
    TouchableOpacity,
    ActivityIndicator,
    Alert} from 'react-native';
import Logo from '../assets/logo.png';
import { Input } from '../components/Input';
import { AntDesign } from '@expo/vector-icons'; 
import { useAuth } from '../context/Auth';

export function Login(){
    const [matricula, setMatricula] = useState('');
    const [password, setPassword] = useState('');
    const {signWithGoogle,signWithSUAP} = useAuth();
    const[isLoading,setIsLoading] = useState(false);

    async function handleLoginGoogle(){
        try{
           setIsLoading(true);
           return await signWithGoogle();
        }catch(error){
            setIsLoading(false);
            console.log(error);
        }   
    }

    
    async function handleLoginSuap(){
        if(!password || !matricula){
            Alert.alert("Informe todos os dados");
        }
      
        try{
            setIsLoading(true);
            return await signWithSUAP(matricula,password);
         }catch(error){
             console.log(error);
             setIsLoading(false);
         } 


    }

    if(isLoading){
        return(
            <View style={{ flex: 1, justifyContent: 'center',alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        )
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
                <TouchableOpacity style={styles.styleButton} onPress={ handleLoginSuap }>
                    <Text style={styles.textButton}>Entrar</Text>
                </TouchableOpacity>
             </View>
                          
            <TouchableOpacity style={ styles.buttonGoogleSocial  } onPress={handleLoginGoogle}> 
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