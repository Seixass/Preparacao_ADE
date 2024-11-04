import jwt from "jsonwebtoken";
import Usuario from "../models/usuarioModel.js";

export const getUserByToken = (token) => {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            return reject({ status: 401, msg: "Erro acesso negado" });
        }
        const decoded = jwt.verify(token, "SUPERSENHASEGURA");
        //decoded -> {id, nome, email, nickname}
        const usuarioId = decoded.id;

        try {
            const usuario = await Usuario.findOne({ // corrigido
                raw: true,
                where: {
                    id: usuarioId
                },
                attributes: [ // corrigido
                    'id',
                    'nome',
                    'imagem'
                ]
            });
            if (!usuario) {
                reject({ status: 404, msg: "Usuário não encontrado" });
            }
            resolve(usuario);
        } catch (error) {
            reject({ status: 500, msg: "Erro ao buscar usuários" }); // corrigido
        }
    });
};
