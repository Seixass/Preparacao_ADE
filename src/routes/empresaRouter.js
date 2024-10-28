import { Router } from "express";
import { getEmpresas, createEmpresa } from "../controllers/empresaController.js"

const router = Router();

router.post("/", createEmpresa)
router.get("/", getEmpresas)

export default router;