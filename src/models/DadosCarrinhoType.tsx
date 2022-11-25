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
  getQuantidade: (id: number) => number;
  aumentarQuantidade: (id: number) => void;
  diminuirQuantidade: (id: number) => void;
  removerItem: (id: number) => void;
  mostraItens: () => void;
  cartItems: any;
};
