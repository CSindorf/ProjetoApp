import React, { createContext, useState } from "react";
import jwt_decode from 'jwt-decode';

import { DadosUsuarioType } from "../models/DadosUsuarioType";

//criando contexto
export const DataContext = createContext({});

//criando provider
export const DataProvider = ({ children }) => {
    const [dadosUsuario, setDadosUsuario] = useState<DadosUsuarioType>(); //dentro do <> está dizendo que esse useState é do tipo DadosUsuarioType

    const armazenaDadosUsuario = (jwt: any) => {
        var tokenDecodificado: any = jwt_decode(jwt);

        //armazenando apenas a chave usuário do json decodificado
        //o .usuario indica o que quer pegar lá do json
        var usuario = tokenDecodificado.usuario;

        //está transferindo a string json contida dentro da variável usuario num objeto
        //assim pode acessar tudo contido nessa string por esse objeto, para usar depois no setDados
        // esse usuario conté isso tudo: {\"userId\":1, \"usuarioNome\":\"Catarina\", \"userEmail\":\"catarina@sindorf.com.br\"}
        usuario = JSON.parse(usuario)

        setDadosUsuario({
            id: usuario?.userId, //esse sinal de ? é para verificar antes se o valor está nulo e não dar erro
            nome: usuario?.usuarioNome,
            email: usuario?.userEmail,
            token: jwt
        })
    }

    return (
        <DataContext.Provider value={{ dadosUsuario, armazenaDadosUsuario }}>
            {children}
        </DataContext.Provider>
    );
}