import React,{useContext, } from 'react';
import { StyleSheet, 
  Text, 
  View, 
  StatusBar,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { useAuth } from '../context/Auth';

export function Home() {
  const {user, logout,userLoading} = useAuth();

  
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

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
