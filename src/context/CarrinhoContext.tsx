import {createContext, useState, useContext} from 'react';
import {
  DadosCarrinhoType,
  DadosCarrinhoProviderType,
  CarrinhoContextType,
} from '../models/DadosCarrinhoType';

export const CarrinhoContext = createContext({} as CarrinhoContextType);

export function useCarrinho() {
  return useContext(CarrinhoContext);
}

export const CarrinhoProvider = ({children}: DadosCarrinhoProviderType) => {
  const [cartItems, setCartItems] = useState<DadosCarrinhoType[]>([]);

  function getQuantidade(id: number) {
    return cartItems.find(item => item.id === id)?.qtd || 0;
  }

  function aumentarQuantidade(id: number, imagem: string, nome: string) {
    setCartItems(itensAtuais => {
      if (itensAtuais.find(item => item.id === id) == null) {
        return [...itensAtuais, {id, nome, imagem, qtd: 1}];
      } else {
        return itensAtuais.map(item => {
          if (item.id === id) {
            return {...item, qtd: item.qtd + 1};
          } else {
            return item;
          }
        });
      }
    });
    console.log(cartItems);
  }

  function diminuirQuantidade(id: number) {
    setCartItems(itensAtuais => {
      if (itensAtuais.find(item => item.id === id)?.qtd === 1) {
        return itensAtuais.filter(item => item.id !== id);
      } else {
        return itensAtuais.map(item => {
          if (item.id === id) {
            return {...item, qtd: item.qtd - 1};
          } else {
            return item;
          }
        });
      }
    });
  }

  function removerItens(id: number) {
    setCartItems(itensAtuais => {
      return itensAtuais.filter(item => item.id !== id);
    });
  }

  function mostraItens() {
    console.log(cartItems);
    return cartItems;
  }

  return (
    <CarrinhoContext.Provider
      value={{
        cartItems,
        getQuantidade,
        aumentarQuantidade,
        diminuirQuantidade,
        removerItens,
      }}>
      {children}
    </CarrinhoContext.Provider>
  );
};
