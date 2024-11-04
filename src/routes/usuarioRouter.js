import { Router } from "express";
import { create, login, userInfo } from "../controllers/usuarioController.js";

const router = Router();

router.post("/", create);
router.post("/login", login);
router.get("/info", userInfo);

export default router;
