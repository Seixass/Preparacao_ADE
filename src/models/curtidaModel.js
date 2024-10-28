import { DataTypes } from "sequelize";
import conn from "../config/conn.js";

import Usuario from "./usuarioModel.js";
import Publicacao from "./publicacaoModel.js";

const Curtida = conn.define(
    "curtidas",
    {
        tipo_avalicao: {
            type: DataTypes.ENUM(["up", "down"]),
            allowNull: false
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
        }
    },
    {tableName: "curtidas"}
)

Usuario.belongsToMany(Publicacao,{
    through: Curtida,
    foreignKey:'usuario_id',
    otherKey:'publicacao_id'
})
Publicacao.belongsToMany(Usuario,{
    through: Curtida,
    foreignKey:'publicacao_id',
    otherKey:'usuario_id'
})

export default Curtida;