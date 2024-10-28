import Publicacao from "../models/publicacaoModel.js";
import { literal } from "sequelize";
import Comentario from "../models/comentarioModel.js";

export const getAll = async (req, res) => {
  //RF02 - listar publicacoes
  const publicacoes = await Publicacao.findAll({
    raw: true,
    attributes: [
      "id",
      "titulo",
      "local",
      "cidade",
      "imagem",
      [
        literal(`(
            SELECT COUNT(*) from curtidas
            WHERE curtidas.publicacao_id = publicacoes.id
            AND curtidas.tipo_avalicao = 'up'
        )`),
        "total likes",
      ],
      [
        literal(`(
            SELECT COUNT(*) from curtidas
            WHERE curtidas.publicacao_id = publicacoes.id
            AND curtidas.tipo_avalicao = 'down'
        )`),
        "total deslikes",
      ],
      [
        literal(`(
            SELECT COUNT(*) from comentarios
            WHERE comentarios.publicacao_id = publicacoes.id
        )`),
        "total comentários",
      ],
    ],
  });
  res.status(200).json(publicacoes);
};

export const getPublicacao = async (req, res) => {
  const { id } = req.params;

  const publicacao = await Publicacao.findOne({
    raw: true,
    where: { id },
    attributes: [
      "id",
      "titulo",
      "local",
      "cidade",
      "imagem",
      [
        literal(`(
                SELECT COUNT(*) from curtidas
                WHERE curtidas.publicacao_id = publicacoes.id
                AND curtidas.tipo_avalicao = 'up'
            )`),
        "total likes",
      ],
      [
        literal(`(
                SELECT COUNT(*) from curtidas
                WHERE curtidas.publicacao_id = publicacoes.id
                AND curtidas.tipo_avalicao = 'down'
            )`),
        "total deslikes",
      ],
      [
        literal(`(
                SELECT COUNT(*) from comentarios
                WHERE comentarios.publicacao_id = publicacoes.id
            )`),
        "total comentários",
      ],
    ],
  });

  const comentariosPublicacao = await Comentario.findAll({
    raw: true,
    where: { publicacao_id: publicacao.id },
  });

  publicacao.comentarios = comentariosPublicacao
  res.status(200).json(publicacao);
};

export const createPublicacao = async (req, res) => {
    try {
        const { titulo, local, cidade, imagem, id_empresa } = req.body;

        if (!titulo || !local || !cidade || !id_empresa) {
            return res.status(400).json({ error: "Os dados estão incompletos, tente novamente." });
        }

        const novaPublicacao = await Publicacao.create({
            titulo,
            local,
            cidade,
            imagem,
            id_empresa
        });

        return res.status(201).json(novaPublicacao);
    } catch (e) {
        console.error("Erro ao criar publicação:", e);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};
