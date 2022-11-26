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
  const [badgeTotal, setBadgeTotal] = useState(0);

  function getTotalCarrinho() {
    let total = 0;
    cartItems.forEach(item => {
      total += item.qtd;
    });
    setBadgeTotal(total);

    return badgeTotal;
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

  function removerItens() {
    // setCartItems(itensAtuais => {
    //   return itensAtuais.filter(item => item.id !== id);
    // });
    setCartItems([]);
  }

  return (
    <CarrinhoContext.Provider
      value={{
        cartItems,
        getTotalCarrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        removerItens,
      }}>
      {children}
    </CarrinhoContext.Provider>
  );
};
