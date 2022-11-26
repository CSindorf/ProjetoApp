import React, { useContext, useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import AxiosInstance from '../../api/AxiosInstance';

import { DataContext } from '../../context/DataContext';

import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '../../components/Loading';
import { DadosEditoraType } from '../../models/DadosEditoraType';
import { DadosLivroType } from '../../models/DadosLivroType';
import { incrementLocalData } from '../../services/LocalStorageService';
import { styles } from './style';

const HomeEditora = ({route, navigation}) => {
  const {editoraId} = route.params;

  console.log(editoraId);

  //-------------------------------------
  //Dados Editora

  const [dadosEditora, setDadosEditora] = useState<DadosEditoraType>();
  const {dadosUsuario} = useContext(DataContext);
  const [dadosLivro, setDadosLivro] = useState<DadosLivroType[]>([]);
  const [selectedLivro, setSelectedLivro] = useState(null);
  const [loading, setLoading] = useState(false);

  //    const CardLivro = ({ livro }) => {
  //         return (
  //             <Card style={styles.cardLivro} id={livro.id}>
  //                 <Card.Title title={livro.nomeLivro} />
  //                 <Card.Cover source={{ uri: livro.urlImagem }} style={styles.itemLivro} />
  //                 <Card.Actions style={{ justifyContent: 'center' }}>
  //                     <Button onPress={() => addFavorite(livro)}><Ionicons name='heart-circle' color='#2a8ba1' size={36} /></Button>
  //                     <Button onPress={() => addCart(livro.codigoLivro)}><Ionicons name='cart' color='#2a8ba1' size={36} /></Button>
  //                 </Card.Actions>
  //             </Card>
  //         );
  //     }

  const Item = ({item, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.destaque}>
      <Image
        source={{uri: item.urlImagem}}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={[styles.title]}>{item.nomeLivro}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button onPress={() => addFavorite(item)}>
          <Ionicons name="heart-circle" color="#2a8ba1" size={20} />
        </Button>
        <Button onPress={() => addCart(item.codigoLivro)}>
          <Ionicons name="cart" color="#2a8ba1" size={20} />
        </Button>
      </View>
    </TouchableOpacity>
  );
  const addFavorite = (livro: DadosLivroType) => {
    //console.log(`Favoritos: Livro selecionado: ${JSON.stringify(livro)}`);
    incrementLocalData('favoritos', livro);
  };

  const addCart = (id: number) => {
    console.log(`Carrinho: Livro selecionado: ${id}`);
  };

  const getLivroByEditora = async () => {
    setLoading(true);
    AxiosInstance.get(`/livros/por-editora/${editoraId}`, {
      headers: {Authorization: `Bearer ${dadosUsuario?.token}`},
    })
      .then(resultado => {
        console.log('Dados das livros: ' + JSON.stringify(resultado.data));
        setDadosLivro(resultado.data);
        console.log(dadosLivro);
      })
      .catch(error => {
        console.log('ocorreu um erro ' + JSON.stringify(error));
      });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    getLivroByEditora();
  }, []);

  const navigateToLivro = (id: any) => {
    setSelectedLivro(id);
    navigation.navigate('Home Livro', {codigoLivro: id});
  };

  if (loading) {
    return <Loading />;
  }

  const renderItem = ({item}) => {
    return (
      <Item item={item} onPress={() => navigateToLivro(item.codigoLivro)} />
    );
  };

  return (
    <>
      {/* <>
                        {dadosLivro?.map((livro:any)=>
                            <View key={livro.id}>
                                <CardLivro livro={livro}/>
                            </View>
                        )}
                    </> */}
      <ImageBackground
        source={require('../../assets/image-background.jpg')}
        style={styles.imageBackground}>
        <Text style={styles.pageTitle}>
          <Ionicons name="book" color="#2a8ba1" size={30} /> Livros
        </Text>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={dadosLivro}
            renderItem={renderItem}
            keyExtractor={item => item.codigoLivro}
            extraData={selectedLivro}
            numColumns={2} // Número de colunas
            style={styles.container}
            // horizontal={false}
          />
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default HomeEditora;
