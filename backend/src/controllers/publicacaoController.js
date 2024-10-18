
import Publicacao from "../models/publicacaoModel.js";

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

export const getPublicacoes = async (req, res) => {
    try {
        const publicacoes = await Publicacao.findAll(); 

        return res.status(200).json(publicacoes); 
    } catch (e) {
        console.error("Erro ao obter publicações:", e);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};
