import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LoadingSmall from '../../components/LoadingSmall';

import {CarrinhoContext, useCarrinho} from '../../context/CarrinhoContext';

const Carrinho = () => {
  const {
    aumentarQuantidade,
    diminuirQuantidade,
    getTotalCarrinho,
    removerItens,
  } = useContext(CarrinhoContext);

  const {cartItems} = useCarrinho();
  const [loading, setLoading] = useState(false);

  return (
    <ImageBackground
      source={require('../../assets/image-background.jpg')}
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
            flex: 1,
          }}>
          {cartItems.length === 0 && (
            <Text style={{fontSize: 30, fontWeight: '500'}}>
              O carrinho está vazio
            </Text>
          )}
          <View
            style={{
              // MAIN CONTAINER
              backgroundColor: 'rgba(255, 255, 255, 1)',
              paddingStart: 25,
              paddingEnd: 25,
              paddingTop: 20,
            }}>
            {cartItems.map(item => (
              <View
                key={item.id}
                style={{
                  //CARD CONTAINER
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                  borderBottomWidth: 0.2,
                  borderBottomColor: ' rgba(0, 0, 0, 0.4)',
                }}>
                <Image
                  style={{
                    width: 80,
                    height: 110,
                    marginEnd: 15,
                    marginBottom: 20,
                    resizeMode: 'center',
                  }}
                  source={{
                    uri: item.imagem,
                  }}
                />
                <View
                  style={{
                    // CONTENT
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: 180,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                    }}>
                    {item.nome}
                  </Text>
                  <View
                    style={{
                      // BOTOES
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 28,
                    }}>
                    <TouchableOpacity
                      style={{
                        // BOTAO
                        width: 40,
                        height: 22,
                        backgroundColor: '#ccc',
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => diminuirQuantidade(item.id)}>
                      <Text>-</Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        // QUANTIDADE
                        marginStart: 5,
                        marginEnd: 5,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      {item.qtd}
                    </Text>
                    <TouchableOpacity
                      style={{
                        //BOTAO
                        width: 40,
                        height: 22,
                        backgroundColor: '#ccc',
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => aumentarQuantidade(item.id)}>
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
            {cartItems.length !== 0 && (
              <View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text style={{fontSize: 18}}>Total</Text>
                  <Text style={{fontSize: 18}}>R$ 275,79</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setLoading(true);

                    setTimeout(() => {
                      removerItens();
                      setLoading(false);
                    }, 1200);
                  }}
                  style={{
                    //BOTAO COMPRAR
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 18,
                    marginBottom: 18,
                    paddingTop: 15,
                    paddingBottom: 15,
                    backgroundColor: '#2a8ba1',
                  }}>
                  {loading ? (
                    <LoadingSmall size="small" color="#fff" />
                  ) : (
                    <Text style={{color: '#fff', fontWeight: '600'}}>
                      Finalizar Pedido
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Carrinho;
