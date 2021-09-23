import React,{useState,useEffect} from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';

import { StyleSheet, 
  Text, 
  View, 
  StatusBar,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { useAuth } from '../context/Auth';

/**
 * 
 * @returns 
 */
export function Home() {

  // pegando os dados do context
  const {user, logout,userLoading} = useAuth();
  const [imageAvatarPath,setImageAvatarPath] = useState('');

  const userStorageImagemPerfil = '@ifrndo:imagePerfil';


  /** Função que abre a opção de escolha de imagem. */
  async function showImagePicker(){
    // Pedindo permissão para acessar os arquivos.
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Não permitiu acesso ao diretório das imagens");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImageAvatarPath(result.uri);
      //salvando a imagem
      await AsyncStorage.setItem(userStorageImagemPerfil,  result.uri  );
      console.log(result.uri);
    }
  }


  // Funcao para abrir câmera.
  async function openCamera() {
  
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImageAvatarPath(result.uri);

      //salvando a imagem
      await AsyncStorage.setItem(userStorageImagemPerfil, result.uri );
      console.log(result.uri);
    }
  }

  //carregando a imagem.
  useEffect(() => {
    
    async function loadImagem() {
      const urlPhoto = await AsyncStorage.getItem(userStorageImagemPerfil);
      
      if(urlPhoto){
        console.log("Imagem: " + urlPhoto);
        setImageAvatarPath(urlPhoto); // set state
      }
    }
    
    loadImagem();

  },[]);

  
  if(userLoading){
      return(
          <View style={{ flex: 1, justifyContent: 'center',alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#0000ff"/>
          </View>
      )
  }   

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.header}>
        
        <View style={styles.dataHeader}> 
          <Text style={styles.textHeader}>IFRN.DO</Text>
        </View>

        <View style={styles.profile}>
          <Image
              style={ styles.tinyLogo}
              source={{ uri: user.photo }}
          />
          <Text style={styles.nameUser}> {user.name}</Text>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.imagemConf}>
        <Text style={styles.textConfig}>Selecionar Imagem</Text>    
        <Image
              style={ styles.imageAvatar}
              source={{ uri:  (imageAvatarPath ?  imageAvatarPath :user.photo) }}
          />
        <View style={styles.viewButtonCamera}>
          <TouchableOpacity onPress={openCamera}>
              <AntDesign name="camera" size={35} color="#1DB863" />
          </TouchableOpacity>
          <TouchableOpacity onPress={showImagePicker}>
            <Entypo name="folder-images" size={35} color="#1DB863" />
          </TouchableOpacity>
        </View>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imagemConf:{
    marginTop: 20,
    width: "100%",
    alignItems: "center"
  },
  textConfig:{
      margin: 20,
      fontSize: 20,

  },
  imageAvatar:{
    width: 150,
    height: 150,
    borderRadius: 70,
  },
  viewButtonCamera:{
    width: '40%',
    flexDirection:'row',
    justifyContent: 'space-around',
  },
  dataHeader:{
    alignItems: 'center',
    justifyContent:'center',
    padding: 20,
    marginTop:15,
  },
  header:{
    width: "100%",
    height:  150,
    backgroundColor: '#1DB863',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
   
  },
  textHeader:{
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  button:{
    margin: 20,
    height: 60,
    backgroundColor: '#6a5acd',
    justifyContent:'center',
  },

  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  nameUser:{
    fontSize: 18,
  },
  profile:{
    marginTop: 20,
    alignItems:'flex-end',
    justifyContent: 'center'
  },
  logout:{
    marginTop:5,
    color: '#e0e1dd',
    fontSize: 15
  }
});
