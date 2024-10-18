import { Router } from "express";
import { createEmpresa } from "../controllers/empresaController.js"

const router = Router();

router.post("/", createEmpresa)

export default router;