import jwt from "jsonwebtoken"

const createUserToken = (usuario, req, res) => {
    console.log('usuario ==>', usuario)
    console.log('request ==>', req)
    console.log('response ==>', res)

    const token = jwt.sign(
        {//payload -> info usuário
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            nickname: usuario.nickname
        },
        "SUPERSENHASEGURA", //SENHA
        {//header -> crypt, tempo
            expiresIn: '24h'
        } 
    )

    res.status(200).json({
        message:"Você está logado",
        token,
        usuarioId: usuario.id
    })
};

export default createUserToken;