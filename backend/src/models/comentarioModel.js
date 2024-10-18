import { DataTypes, STRING } from "sequelize";
import conn from "../config/conn.js";

import Usuario from "./usuarioModel.js"
import Publicacao from "./publicacaoModel.js";

const Comentario = conn.define(
    "comentarios",
    {
        comentario: {
            type: DataTypes.STRING,
            validate: {
                min: 3,
                max: 255
            },
        },
        usuario_id:{
            type: DataTypes.INTEGER,
            references: {
                model: Usuario,
                key: 'id'
            }
        },
        publicacao_id:{
            type: DataTypes.INTEGER,
            references: {
                model: Publicacao,
                key: 'id'
            }
        },
    },
    {tableName: "comentarios"}
)

Usuario.belongsToMany(Publicacao,{
    through: Comentario,
    foreignKey:'usuario_id',
    otherKey:'publicacao_id'
})
Publicacao.belongsToMany(Usuario,{
    through: Comentario,
    foreignKey:'publicacao_id',
    otherKey:'usuario_id'
})

export default Comentario;