import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { styles } from './style';
import AxiosInstance from '../../api/AxiosInstance';
import Loading from '../../components/Loading';
import Alerta from '../../components/Alert';
import { DataContext } from '../../context/DataContext';

const Login = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { armazenaDadosUsuario } = useContext(DataContext);

  const handlelogin = async () => {
    setLoading(true)
    var tokenJwt: any = null;
    //esse log abaixo está usando para mostrar no log os dados digitados nos campos email e senha
    //console.log(`Email: ${email} - Senha: ${senha}`);

    try {
      const retorno = await AxiosInstance.post('/auth/login', { email: email, password: senha });

      if (retorno.status === 200) {
        //se der sucesso na requisição, ela retorna só o data, não tudo
        //console.log('Retorno: ' + JSON.stringify(retorno.data));

        //está colocando na variável o conteúdo do retorno.data
        tokenJwt = retorno.data;
        //passando pro método o token jwt
        armazenaDadosUsuario(tokenJwt["jwt-token"])

        navigation.navigate('Livraria');
      }

    } catch (error) {
      //console.log('Erro ao autenticar - ' + JSON.stringify(error));
      Alerta('Oops!', 'Login ou senha errados')
    }

    //colocando um timeout pra requiisção completar ou falhar
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  //toda vez que digita algo na página ele "renderiza" e roda esse useEffect
  /* useEffect(() => {
    console.log("Componente renderizado");
   }); */

  //para rodar só uma vez, quando for carregado da primeira vez, adiciona o ", []" no final
  /* useEffect(() => {
    console.log("Componente renderizado só 1 vez");
   }, []); */

  //roda toda vez que for utilizado o useState "email", então toda vez que digitar algo no input email
  /* useEffect(() => {
    console.log("Componente renderizado no email");
  }, [email]); */

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/image-background-login.jpg')} style={styles.imageBackground}>
        <Text style={styles.titulo}>Bem-vindo</Text>
        <TextInput style={styles.input} placeholder='E-mail' onChangeText={setEmail} value={email} />
        <TextInput style={styles.input} placeholder='Senha' secureTextEntry={true} onChangeText={setSenha} value={senha} />
        <TouchableOpacity style={styles.botao} onPress={() => handlelogin()}>
          <Text style={styles.textoBotao}>Login</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Login;