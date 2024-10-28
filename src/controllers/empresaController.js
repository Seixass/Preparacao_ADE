import Empresa from "../models/empresaModel.js";
import Curtida from "../models/curtidaModel.js";


export const getEmpresas = async (req, res) => {
    try {
        const infoEmpresa = await Empresa.findByPk(1, {raw:true})
        console.log(infoEmpresa)

        const like = await Curtida.count({
            where: {tipo_avalicao: 'up'}
        })
        // console.log('like ===>', like)

        const deslike = await Curtida.count({
            where: {tipo_avalicao: 'down'}
        })
        // console.log('like ===>', deslike)

        const empresa = {
            id: infoEmpresa.id,
            nome: infoEmpresa.nome,
            imagem: infoEmpresa.imagem,
            likes: like,
            deslikes: deslike
        }
        res.status(200).json(empresa)
    } catch (error) {
        console.error("Erro ao obter empresas:", error);
        return res.status(500).json({ err: "Erro ao buscar dados da empresa" });
    }

};




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

