import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import AxiosInstance from '../../api/AxiosInstance';

import {DataContext} from '../../context/DataContext';
import {useCarrinho} from '../../context/CarrinhoContext';

import {DadosEditoraType} from '../../models/DadosEditoraType';
import {DadosLivroType} from '../../models/DadosLivroType';
import {
  storeLocalData,
  incrementLocalData,
  retrieveLocalData,
  removeLocalData,
} from '../../services/LocalStorageService';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './style';
import Loading from '../../components/Loading';
import {SafeAreaView} from 'react-native-safe-area-context';
import Livro from '../../components/Modal';

const HomeLivro = ({route, navigation}) => {
  const {codigoLivro} = route.params;

  console.log(codigoLivro);

  //-------------------------------------
  //Dados Editora
  const {dadosUsuario} = useContext(DataContext);
  const {
    getQuantidade,
    aumentarQuantidade,
    diminuirQuantidade,
    removerItem,
    mostraItens,
    cartItems,
  } = useCarrinho();
  const [dadosLivro, setDadosLivro] = useState<DadosLivroType>();
  const [loading, setLoading] = useState(false);

  const addFavorite = (dadoslivro: DadosLivroType) => {
    //console.log(`Favoritos: Livro selecionado: ${JSON.stringify(livro)}`);
    incrementLocalData('favoritos', dadosLivro);
  };

  const addCart = (id: number) => {
    console.log(`Carrinho: Livro selecionado: ${id}`);
  };

  const getLivroById = async () => {
    setLoading(true);
    AxiosInstance.get(`/livros/${codigoLivro}`, {
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
    }, 1000);
  };

  useEffect(() => {
    getLivroById();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ImageBackground
        source={require('../../assets/image-background.jpg')}
        style={styles.imageBackground}>
        <View style={styles.container}>
          <View style={styles.cabecalho}>
            <Image
              style={{width: 300, height: 350}}
              source={{uri: dadosLivro?.urlImagem}}
            />
          </View>
          <View style={styles.conteudo}>
            <Title style={styles.titulo}> {dadosLivro?.nomeLivro}</Title>
            <Text style={styles.sub}>{dadosLivro?.autorDTO.nomeAutor}</Text>
            <Text style={styles.sub}>{dadosLivro?.editoraDTO.nomeEditora}</Text>
          </View>
          <View style={styles.rodape}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Button onPress={() => addFavorite(dadosLivro)}>
                <Ionicons name="heart-circle" color="#2a8ba1" size={50} />
              </Button>
              <Button
                onPress={() =>
                  aumentarQuantidade(
                    dadosLivro?.codigoLivro,
                    dadosLivro?.urlImagem,
                    dadosLivro?.nomeLivro,
                  )
                }>
                <Ionicons name="cart" color="#2a8ba1" size={50} />
              </Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
    // <View>
    //     <Card style={styles.cardLivro} key={`livro.details${dadosLivro?.codigoLivro}`}>
    //     <Card.Title title={dadosLivro?.nomeLivro} subtitle={dadosLivro?.nomeLivro} />
    //     <Card.Cover source={{ uri: dadosLivro?.urlImagem }} style={styles.itemLivro} />
    //     <Card.Actions style={{ justifyContent: 'center' }}>
    //         <Button onPress={() => addFavorite(dadosLivro)}><Ionicons name='heart-circle' color='#2a8ba1' size={36} /></Button>
    //         <Button onPress={() => addCart(dadosLivro.codigoLivro)}><Ionicons name='cart' color='#2a8ba1' size={36} /></Button>
    //     </Card.Actions>
    // </Card>
    // </View>
  );
};

export default HomeLivro;
