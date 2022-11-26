import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AxiosInstance from '../../api/AxiosInstance';
import Loading from '../../components/Loading';
import { DataContext } from '../../context/DataContext';
import { DadosEditoraType } from '../../models/DadosEditoraType';
import { DadosLivroType } from '../../models/DadosLivroType';
import { incrementLocalData } from '../../services/LocalStorageService';
import { styles } from './style';

const Item = ({item, onPress}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <ImageBackground
      source={{uri: item.urlImagem}}
      resizeMode="cover"
      style={styles.image}>
      <Text style={[styles.title]}>{item.nomeEditora}</Text>
    </ImageBackground>
  </TouchableOpacity>
);

const CardLivro = ({item}) => {
  return (
    <Card style={styles.cardLivro}>
      <Card.Title
        title={item.nomeLivro}
        subtitle={item.editoraDTO.nomeEditora}
      />
      <Card.Cover source={{uri: item.urlImagem}} style={styles.itemLivro} />
      <Card.Actions style={{justifyContent: 'center'}}>
        <Button onPress={() => addFavorite(item)}>
          <Ionicons name="heart-circle" color="#2a8ba1" size={36} />
        </Button>
        <Button onPress={() => addCart(item.codigoLivro)}>
          <Ionicons name="cart" color="#2a8ba1" size={36} />
        </Button>
      </Card.Actions>
    </Card>
  );
};

<<<<<<< HEAD
=======
const addFavorite = (livro: DadosLivroType) => {
  incrementLocalData('favoritos', livro) 
  console.warn(livro)
}

const addCart = (id: number) => {
  console.log(`Carrinho: Livro selecionado: ${id}`);
};

>>>>>>> favoritos
const Home = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {dadosUsuario} = useContext(DataContext);
  const [dadosEditora, setDadosEditora] = useState<DadosEditoraType[]>([]); //dentro do <> está dizendo que esse useState é do tipo DadosEditoraType, que é um array
  const [dadosLivro, setDadosLivro] = useState<DadosLivroType[]>([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedLivro, setSelectedLivro] = useState(null);





  //quando a página carregar, ele usa esse método e pega os dados das editoras
  useEffect(() => {
    getAllEditoras();
    getAllLivros();
  }, []);

<<<<<<< HEAD
  const CardLivro = ({item}) => {
    return (
      <Card style={styles.cardLivro}>
        <Card.Title
          title={item.nomeLivro}
          subtitle={item.editoraDTO.nomeEditora}
        />
        <TouchableOpacity onPress={() => navigateToLivro(item.codigoLivro)}>
          {/* <Card.Cover source={{uri: item.urlImagem}} style={styles.itemLivro} /> */}
          <Image
            source={{uri: item.urlImagem}}
            style={styles.itemLivro}></Image>
        </TouchableOpacity>
        <Card.Actions style={{justifyContent: 'center'}}>
          <Button onPress={() => addFavorite(item)}>
            <Ionicons name="heart-circle" color="#2a8ba1" size={36} />
          </Button>
          <Button
            onPress={() =>
              aumentarQuantidade(
                item.codigoLivro,
                item.urlImagem,
                item.nomeLivro,
              )
            }>
            <Ionicons name="cart" color="#2a8ba1" size={36} />
          </Button>
        </Card.Actions>
      </Card>
    );
  };

=======
>>>>>>> favoritos
  //get EDITORAS
  const getAllEditoras = async () => {
    setLoading(true);
    //passando o token no cabeçalho da requisição, se não, não vai carregar nada
    AxiosInstance.get('/editoras', {
      headers: {Authorization: `Bearer ${dadosUsuario?.token}`},
    })
      .then(resultado => {
        //console.log('Dados das editoras ' + JSON.stringify(resultado.data));
        setDadosEditora(resultado.data);
      })
      .catch(error => {
        console.log('Erro ' + JSON.stringify(error));
      });
    //colocando um timeout pra requiisção completar ou falhar
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const navigateToEditorasHome = (id: any) => {
    setSelectedId(id);
    navigation.navigate('Home Editora', {editoraId: id});
  };

  //get LIVROS
  const getAllLivros = async () => {
    setLoading(true);
    //passando o token no cabeçalho da requisição, se não, não vai carregar nada
    AxiosInstance.get('/livros', {
      headers: {Authorization: `Bearer ${dadosUsuario?.token}`},
    })
      .then(resultado => {
        //console.log('Dados dos Livros: ' + JSON.stringify(resultado.data));

        resultado.data.map((key: any, indice: number) =>
          setDadosLivro(dadosLivro => [
            ...dadosLivro,
            {
              codigoLivro: key.codigoLivro,
              nomeLivro: key.nomeLivro,
              dataLancamento: key.dataLancamento,
              codigoIsbn: key.codigoIsbn,
              nomeImagem: key.nomeImagem,
              nomeArquivoImagem: key.nomeArquivoImagem,
              urlImagem: key.urlImagem,
              editoraDTO: {
                codigoEditora: key.editoraDTO.codigoEditora,
                nomeEditora: key.editoraDTO.nomeEditora,
              },
              autorDTO: {
                codigoAutor: key.autorDTO.codigoAutor,
                nomeAutor: key.autorDTO.nomeAutor,
              },
            },
          ]),
        );

        //colocando um timeout pra requiisção completar ou falhar
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch(error => {
        console.log(
          'Ocorreu um erro ao recuperar os dados dos Livros: ' +
            JSON.stringify(error),
        );
      });
  };

  if (loading) {
    return <Loading />;
  }

  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => navigateToEditorasHome(item.codigoEditora)}
      />
    );
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/image-background.jpg')}
        style={styles.imageBackground}>
        <ScrollView style={styles.container}>
          <FlatList
            data={dadosEditora}
            renderItem={renderItem}
            keyExtractor={item => item.codigoEditora}
            extraData={selectedId}
            horizontal={true}
          />
          <Text style={styles.pageTitle}>
            <Ionicons name="star" color="#2a8ba1" size={24} /> Recentes
          </Text>
          <FlatList
            data={dadosLivro}
            renderItem={CardLivro}
            keyExtractor={(item, indice) => indice}
            extraData={setSelectedLivro}
            horizontal={true}
          />
          <View style={styles.destaque}>
            <Text style={styles.pageTitle}>
              <Ionicons name="md-ribbon" color="#2a8ba1" size={24} /> Destaques
            </Text>
            <Image
              source={{uri: 'https://i.ibb.co/QvT9xqd/pig.png'}}
              resizeMode="contain"
              style={styles.image}
            />
            <Text style={[styles.destaqueTitle]}>Nome livro</Text>
            <Text style={[styles.destaqueAutor]}>Nome autor</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Home;
