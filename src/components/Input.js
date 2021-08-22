import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

export function Input({placeholder,onChangeText,secureTextEntry=false}) {
  return (
    <View style={ styles.container}>
      <TextInput style={styles.inputText} placeholder={placeholder}
        placeholderTextColor={"#cecece"}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        marginTop:20,
        height: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    inputText:{
      flex: 1,
      height: '100%',
      backgroundColor: '#FFFFFF',
      paddingLeft: 20,
      fontSize: 17,
      borderRadius: 10,

      
    },
  
});
