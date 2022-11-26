import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DadosLivroType } from '../../models/DadosLivroType';
import { retrieveLocalData, storeLocalData } from '../../services/LocalStorageService';
const CardLivro = ({ item }) => {
  return(
    
   <View  style={styles.ContainerCards}>
    <Card style={styles.cardLivro}>
      <Card.Title title={item?.nomeLivro}  />
      <Card.Cover source={{uri: item?.urlImagem}} />
      <Card.Actions style={{justifyContent:'center'}}>
        <Button onPress={() => removeFromFavoritosByKeyAndValue('favoritos', item.codigoLivro)}><Ionicons name='trash-outline' color='#000' size={36} /></Button>
      </Card.Actions>
    </Card>
  </View>
  );
}

const removeFromFavoritosByKeyAndValue = async (key:string, codigoLivro:any) =>{
  var arrayJsonFavoritos:any = null;
  var arrayJsFavoritos = [];
  var arrayJsAlteradoFavoritos = [];
  try {
    //recupera os dados da key existentes atualmente
    arrayJsonFavoritos = await retrieveLocalData(key);

    //converte os dados de JSON para objeto Javascript
    arrayJsFavoritos = JSON.parse(arrayJsonFavoritos);

    //Percorre o array JS, filtrando o seu conteúdo e criando um novo array sem
    //  o elemento do array que contem o codigoLivro igual ao fornecido ao metodo
    arrayJsAlteradoFavoritos = arrayJsFavoritos.filter(function(e){
      return e.codigoLivro !== codigoLivro;
    })

    //salvar o array filtrado, sem o item removido
    storeLocalData(key, arrayJsAlteradoFavoritos);
  } catch (error) {
    console.log(`Erro ao remover dados (key: ${key}) com a valor do codigo do livro ${codigoLivro} do LocalStorage: ${error}`);
  }
}

const Favoritos = () =>{
    var actualData:any = null;
    var [data, setData] = useState<DadosLivroType[]>([]);
    
    const handleFavoritos = async () => {
        //await clearStorage(); //limpa todos os dados atuais da key especificada. Usar para fins de teste
        try {
          //recupera os dados da key existentes atualmente
          actualData = await retrieveLocalData('favoritos');
          //converte os dados, de JSON para objeto Javascript
          actualData = JSON.parse(actualData);
          //console.log(`actualData: ${JSON.stringify(actualData, null, '\t')}`);
    
          if (actualData !==undefined && actualData !== null) {
            //armazena os dados existentes atualmente no array data
            setData(actualData);
            // data.push(actualData);
            //transforma os dados recebidos pelo metodo num objeto JS
          } else{
            //quando chamado pela primeira vez, caso nao exista ainda dados pra key, os armazena
            console.log("Não há favoritos")
            // storeLocalData(key, value);
          }
        } catch (error) {
            console.log(`${error}`)
            //console.log(`Erro ao recuperar dados (key: ${key}) do LocalStorage: ${error}`);
        }
    }

    useEffect(() => {
        handleFavoritos();
    },[data]);

    return(
     
        <ImageBackground
        source={require('../../assets/image-background.jpg')}
        style={styles.imageBackground}>
     <View  style={{paddingBottom: 120}}>
        <FlatList
          data={data}
          renderItem={CardLivro}
          keyExtractor={(item, indice) => indice}
          horizontal={false}
        />
      </View>
    </ImageBackground>

    )
}

 /*    const renderItem = ({ item }) => {
      return (
        <Item
          item={item?.nomeLivro}
       
        />
      );
    }; */
    
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    marginBottom: 50,
    //backgroundColor: '#6cc1d4',
    //marginTop: StatusBar.currentHeight || 0,
    paddingTop: 6,
  },
  ContainerCards: {
  
    justifyContent:'center',
    alignItems:'center',
  },
  destaque: {
    marginBottom: 100,
  },
    Text: {
        justifyContent:'center',
        flexDirection:"row",
        alignItems:'center',
    },
    item: {
      marginHorizontal: 8,
      marginBottom:20,
      padding:10,
      width:200,
      height:200,
      justifyContent:'center',
      flexDirection:"row",
      alignItems:'center',
    },
    cardLivro: {
      marginHorizontal: 8,
      padding: 10,
      justifyContent: 'center',
      margin: 20,
      borderRadius: 5,
      borderColor: '#fff',
      borderWidth: 2,
      elevation: 5,
      shadowColor: '#000',
      width: 350,
    },
    'cardLivro:last-child': {
       marginBottom: 100
    },  
    sectionTitle: {
      fontSize: 24,
      marginLeft: 10,
      marginBottom:6,
      fontWeight: 'bold'
    },
    title: {
      fontSize: 14,
      flex:.8
    },
    btnItem:{
      flexDirection:"column",
      alignItems:'center',
      justifyContent:'center', 
      width:200, 
      height:200, 
      marginBottom: 60
    },
    imgItem:{
      flex:3, 
      width:140, 
      height:140
    },
    imageBackground: {
      resizeMode: 'repeat',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }
})

export default Favoritos;