import Usuario from "../models/usuarioModel.js";
import createUserToken from "../helpers/createUserToken.js";
import { getToken } from "../helpers/getToken.js";
import { getUserByToken } from "../helpers/getUserByToken.js";
import Curtida from "../models/curtidaModel.js";
import conn from "../config/conn.js";

export const logout = (req, res) => {
  res.status(200).json({ message: "Você saiu da aplicação" });
};

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!email) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    if (usuario.senha !== senha) {
      res.status(401).json({ message: "Senha não conferem" });
      return;
    }

    createUserToken(usuario, req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Erro ao fazer login" });
  }
};

export const create = async (req, res) => {
  const { nome, email, nickname, senha, imagem } = req.body;

  if (!nome || !email || !nickname || !senha || !imagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const novoUsuario = await Usuario.create({
      nome,
      email,
      nickname,
      senha,
      imagem,
    });

    res
      .status(201)
      .json({ message: "Usuario criado com sucesso", usuario: novoUsuario });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const userInfo = async (req, res) => {
  try {
    const token = getToken(req);
    // console.log(token)
    const usuario = await getUserByToken(token);
    // console.log(usuario)
    const UsuarioId = usuario.id;

    //quant. de likes e deslike
    const like = await Curtida.findAndCountAll({
      raw: true,
      where: { usuario_id: UsuarioId, tipo_avalicao: "up" },
    });
    const deslike = await Curtida.findAndCountAll({
      raw: true,
      where: { usuario_id: UsuarioId, tipo_avalicao: "down" },
    });
    //Quais publicações o usuário fez a interação
    const publicacoesCurtidas = await conn.query(
      `
        SELECT publicacoes.id, curtidas.tipo_avalicao
        FROM curtidas
        INNER JOIN publicacoes ON curtidas.publicacao_id = publicacoes.id
        WHERE curtidas.usuario_id = :UsuarioId
        `,
      {
        replacements: { UsuarioId },
        type: conn.QueryTypes.SELECT,
      }
    );

    //Montar objeto com as props
    usuario.totalLikes = like.count;
    usuario.totalLikes = deslike.count;
    usuario.interacoes = publicacoesCurtidas;
    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};
