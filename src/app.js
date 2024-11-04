import express, { response } from "express";
import cors from "cors";

import conn from "./config/conn.js";

//Models
import Empresa from "./models/empresaModel.js";
import Usuario from "./models/usuarioModel.js";
import Publicacao from "./models/publicacaoModel.js";
import Curtida from "./models/curtidaModel.js";
import Comentario from "./models/comentarioModel.js";

//Routes
import empresaRouter from "./routes/empresaRouter.js"
import usuarioRouter from "./routes/usuarioRouter.js"
import publicacaoRouter from "./routes/publicacaoRouter.js"

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

conn
  .sync()//{force: true}
  .then()
  .catch(() => console.error(error));

//Utilizar rotas
app.use("/api/empresas", empresaRouter)
app.use("/api/usuarios", usuarioRouter)
app.use("/api/publicacoes", publicacaoRouter)

app.use((req, res) => {
  res.status(404).json({ err: "Rota não encontrada" });
});

export default app;
