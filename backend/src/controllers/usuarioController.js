import Usuario from "../models/usuarioModel.js";

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
