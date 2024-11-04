import { getToken } from "../src/helpers/getToken.js";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    if(!req.headers.authorization){
        return res
        .status(401)
        .json({msg:"Acesso negado! Cabeçalho de autorização ausente"})
    }

    const token = getToken(req)
    if(!token){
        return res
        .status(401)
        .json({msg:"Acesso negado! Token não fornecido ou inválido"})
    }

    try{
        const verified = jwt.verify(token, "SUPERSENHASEGURA")
        req.usuario = verified.id
        next()
    } catch(error) {
    console.log(error)
    res.status(500).json({msg: "Token inválido"})
    }
};

export default verifyToken;