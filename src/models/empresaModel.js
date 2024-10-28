import { DataTypes } from "sequelize";
import conn from "../config/conn.js";

const Empresa = conn.define(
  "empresas",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {tableName: 'empresas'}
);

export default Empresa;