import React,{useContext} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export function Home() {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={()=>{}}>
        <Text style={styles.textButton}>Usuário LOGADO! </Text>
      </TouchableOpacity>    
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    margin: 20,
    height: 60,
    backgroundColor: '#6a5acd',
    justifyContent:'center',
  },
  textButton:{
    fontSize: 30,
    padding: 20,
  }
});
