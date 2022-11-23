import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native';
import { styles } from './style';
import AxiosInstance from '../../api/AxiosInstance';
import Loading from '../../components/Loading';
import { DataContext } from '../../context/DataContext';
import { DadosEditoraType } from '../../models/DadosEditoraType';
import { DadosLivroType } from '../../models/DadosLivroType';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Item = ({ item, onPress, backgroundColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <ImageBackground source={{ uri: item.urlImagem, }} resizeMode="cover" style={styles.image}>
            <Text style={[styles.title]}>{item.nomeEditora}</Text>
        </ImageBackground>
    </TouchableOpacity>
);

const Livros = ({ item, onPress, backgroundColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.itemLivro, backgroundColor]}>
        <Image source={{ uri: item.urlImagem, }} resizeMode="contain" style={styles.image} />
        <Text style={[styles.titleLivro]}>{item.nomeLivro}</Text>
    </TouchableOpacity>
);

const Home = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const { dadosUsuario } = useContext(DataContext);
    const [dadosEditora, setDadosEditora] = useState<DadosEditoraType[]>([]); //dentro do <> está dizendo que esse useState é do tipo DadosEditoraType, que é um array
    const [dadosLivro, setDadosLivro] = useState<DadosLivroType[]>([]);
    const [selectedId, setSelectedId] = useState(null);

    //quando a página carregar, ele usa esse método e pega os dados das editoras
    useEffect(() => {
        getAllEditoras();
        getAllLivros();
    }, []);

    //get EDITORAS
    const getAllEditoras = async () => {
        setLoading(true)
        //passando o token no cabeçalho da requisição, se não, não vai carregar nada
        AxiosInstance.get('/editoras', {
            headers: { "Authorization": `Bearer ${dadosUsuario?.token}` }
        }).then(
            resultado => {
                //console.log('Dados das editoras ' + JSON.stringify(resultado.data));
                setDadosEditora(resultado.data);
            }).catch((error) => {
                console.log('Erro ' + JSON.stringify(error))
            });
        //colocando um timeout pra requiisção completar ou falhar
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    };

    const navigateToEditorasHome = (id: any) => {
        setSelectedId(id);
        navigation.navigate('HomeEditora', { editoraId: id, });
    }

    //get LIVROS
    const getAllLivros = async () => {
        setLoading(true)
        //passando o token no cabeçalho da requisição, se não, não vai carregar nada
        AxiosInstance.get('/livros', {
            headers: { "Authorization": `Bearer ${dadosUsuario?.token}` }
        }).then(
            resultado => {
                console.log('Dados dos Livros ' + JSON.stringify(resultado.data));
                setDadosLivro(resultado.data);
            }).catch((error) => {
                console.log('Erro ' + JSON.stringify(error))
            });
        //colocando um timeout pra requiisção completar ou falhar
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    };

    if (loading) {
        return (
            <Loading />
        )
    }

    const renderItem = ({ item }) => {
        const backgroundColor = item.codigoEditora === selectedId ? "#2a8ba1" : "#6cc1d4";

        return (
            <Item
                item={item}
                onPress={() => navigateToEditorasHome(item.codigoEditora)}
                backgroundColor={{ backgroundColor }}
            />
        );
    };

    const renderLivro = ({ item }) => {
        const backgroundColor = item.codigoLivro === selectedId ? "#2a8ba1" : "#6cc1d4cd";

        return (
            <Livros
                item={item}
                onPress={() => setSelectedId(item.codigoLivro)}
                backgroundColor={{ backgroundColor }}
            />
        );
    };

    return (
        <>
            <ImageBackground source={require('../../assets/image-background.jpg')} style={styles.imageBackground}>
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <View >
                            <FlatList
                                data={dadosEditora}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.codigoEditora}
                                extraData={selectedId}
                                horizontal={true}
                            />
                        </View>
                        <View >
                            <Text style={styles.pageTitle}><Ionicons name='star' color='#2a8ba1' size={24} /> Recentes</Text>
                            <FlatList
                                data={dadosLivro}
                                renderItem={renderLivro}
                                keyExtractor={(livro) => livro.codigoLivro}
                                extraData={selectedId}
                                horizontal={true}
                            />
                        </View>
                        <View style={[styles.destaque, styles.shadowProp]}>
                            <Text style={styles.pageTitle}><Ionicons name='md-ribbon' color='#2a8ba1' size={24} /> Destaques</Text>
                            <Image source={{ uri: "https://i.ibb.co/QvT9xqd/pig.png" }} resizeMode="contain" style={styles.image} />
                            <Text style={[styles.destaqueTitle]}>Nome livro</Text>
                            <Text style={[styles.destaqueAutor]}>Nome autor</Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        </>
    );
}

export default Home 