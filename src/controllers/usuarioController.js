import Usuario from "../models/usuarioModel.js";

import createUserToken from "../helpers/createUserToken.js";

export const logout = (req, res) => {
    res.status(200).json({message:"Você saiu da aplicação"})
} 

export const login = async (req, res) => {
    const {email, senha} = req.body

    try {
        const usuario = await Usuario.findOne({ where: {email} });
        if(!email){
            res.status(404).json({message: "Usuário não encontrado"})
            return
        }

        if(usuario.senha !== senha){
            res.status(401).json({message: "Senha não conferem"})
            return
        }

        createUserToken(usuario, req, res)

    } catch (error) {
        console.error(error)
        res.status(500).json({err: "Erro ao fazer login"})
    }
}


export const create = async (req, res) => {
    const { nome, email, nickname, senha, imagem } = req.body;

    if (!nome || !email || !nickname || !senha || !imagem) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        const novoUsuario = await Usuario.create({
            nome,
            email,
            nickname,
            senha,
            imagem
        });

        res.status(201).json({ message: 'Usuario criado com sucesso', usuario: novoUsuario });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
