import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {CarrinhoContext, useCarrinho} from '../context/CarrinhoContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Badge = () => {
  const {cartItems, getTotalCarrinho} = useCarrinho();

  return (
    <>
      <Ionicons name="cart" color="white" size={24} />
      {cartItems.length !== 0 ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'red',
            borderRadius: 10,
            width: 15,
            height: 15,
            position: 'absolute',
            top: 10,
            right: 32,
          }}>
          <Text style={{color: '#fff', fontWeight: '500', fontSize: 10}}>
            {getTotalCarrinho()}
          </Text>
        </View>
      ) : (
        ''
      )}
    </>
  );
};

export default Badge;
