import React from "react";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    cabecalho:{
      flex: 2,
      marginTop:50,
      justifyContent: 'flex-end',
      alignItems: 'center',
  
    },
    conteudo:{
      flex: 0.5,
      padding: 20,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    titulo:{
      fontWeight: 'bold',
      fontSize: 23,
    },
    sub:{
      fontWeight: 'bold',
      fontSize: 15,
    },
    rodape:{
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
  
    },
    imageBackground: {
      resizeMode: "repeat",
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
   
  });