import {ReactNode} from 'react';

export type DadosCarrinhoType = {
  id: number;
  imagem: string;
  nome: string;
  qtd: number;
};

export type DadosCarrinhoProviderType = {
  children: ReactNode;
};

export type CarrinhoContextType = {
  getTotalCarrinho: () => number;
  aumentarQuantidade: (id: number) => void;
  diminuirQuantidade: (id: number) => void;
  removerItens: () => void;
  cartItems: any;
};
