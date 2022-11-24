import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
} from 'react-native';
import { styles } from './style';
import AxiosInstance from '../../api/AxiosInstance';
import Loading from '../../components/Loading';
import { DataContext } from '../../context/DataContext';
import { DadosEditoraType } from '../../models/DadosEditoraType';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.destaque}>
        <Image source={{ uri: item.urlImagem, }} resizeMode="contain" style={styles.image} />
        <Text style={[styles.title]}>{item.nomeEditora}</Text>
    </TouchableOpacity>
);

const Home = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const { dadosUsuario } = useContext(DataContext);
    const [dadosEditora, setDadosEditora] = useState<DadosEditoraType[]>([]); //dentro do <> está dizendo que esse useState é do tipo DadosEditoraType, que é um array
    const [selectedId, setSelectedId] = useState(null);

    //quando a página carregar, ele usa esse método e pega os dados das editoras
    useEffect(() => {
        getAllEditoras();
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
        navigation.navigate('Home Editora', { editoraId: id, });
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => navigateToEditorasHome(item.codigoEditora)}
            />
        );
    };

    return (
        <>
            <ImageBackground source={require('../../assets/image-background.jpg')} style={styles.imageBackground}>
                <Text style={styles.pageTitle}><Ionicons name='library' color='#2a8ba1' size={30} /> Editoras</Text>
                <FlatList
                    data={dadosEditora}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.codigoEditora}
                    extraData={selectedId}
                    numColumns={2} // Número de colunas
                    style={styles.container}
                />
            </ImageBackground>
        </>
    );
}

export default Home 