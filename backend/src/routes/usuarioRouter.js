import { Router } from "express";
import { create } from "../controllers/usuarioController.js";

const router = Router();

router.post("/", create);

export default router;
