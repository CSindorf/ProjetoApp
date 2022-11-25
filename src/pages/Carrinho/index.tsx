import React, {useContext, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';

import {CarrinhoContext, useCarrinho} from '../../context/CarrinhoContext';

const Carrinho = () => {
  const {aumentarQuantidade, diminuirQuantidade, getTotalCarrinho, removerItem} =
    useContext(CarrinhoContext);

  const {cartItems} = useCarrinho();

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}>
        {cartItems.length === 0 && <Text>Não há itens no carrinho</Text>}
        <View>
          {cartItems.map(item => (
            <View
              key={item.id}
              style={{
                //CARD CONTAINER
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Image
                style={{
                  width: 80,
                  height: 110,
                  marginEnd: 15,
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
              <View>
                <Text>{getTotalCarrinho()}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Carrinho;
