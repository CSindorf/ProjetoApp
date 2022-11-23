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

const HomeEditoras = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const { dadosUsuario } = useContext(DataContext);
    const [dadosEditora, setDadosEditora] = useState<DadosEditoraType[]>([]);

    useEffect(() => {
        getAllEditoras();
    }, []);

    const getAllEditoras = async () => {
        setLoading(true)
        //passando o token no cabeçalho da requisição, se não, não vai carregar nada
        AxiosInstance.get('/editoras', {
            headers: { "Authorization": `Bearer ${dadosUsuario?.token}` }
        }).then(
            resultado => {
                console.log('Dados das editoras ' + JSON.stringify(resultado.data));
                setDadosEditora(resultado.data);
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

    return (
        <View>
            <ImageBackground source={require('../../assets/image-background.jpg')} style={styles.imageBackground}>
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <TouchableOpacity>
                            {dadosEditora.map((dadosEditora) =>
                                <Image source={{ uri: dadosEditora.urlImagem, }} resizeMode="contain" style={styles.image} />
                            )}
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        </View>
    )
};

export default HomeEditoras