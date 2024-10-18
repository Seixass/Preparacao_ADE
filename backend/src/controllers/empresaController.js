import Empresa from "../models/empresaModel.js";

export const createEmpresa = async (req, res) => {
    try {
        const { nome, imagem } = req.body;

        if (!nome) {
            return res.status(400).json({ error: "O nome da empresa é obrigatório." });
        }

        const novaEmpresa = await Empresa.create({
            nome,
            imagem
        });

        return res.status(201).json(novaEmpresa);
    } catch (e) {
        console.error("Erro ao criar empresa:", e);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};

export const getEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.findAll(); 
        return res.status(200).json(empresas);
    } catch (e) {
        console.error("Erro ao obter empresas:", e);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};