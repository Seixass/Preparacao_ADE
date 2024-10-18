import { Router } from "express";
import { createPublicacao } from "../controllers/publicacaoController.js"

const router = Router();

router.post("/", createPublicacao)

export default router;