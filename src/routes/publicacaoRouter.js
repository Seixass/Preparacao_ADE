import { Router } from "express";
import { getAll, getPublicacao, createPublicacao } from "../controllers/publicacaoController.js"

const router = Router();

router.get("/", getAll)
router.get("/:id", getPublicacao)
router.post("/", createPublicacao)

export default router;