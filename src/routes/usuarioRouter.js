import { Router } from "express";
import { create, login, userInfo, logout } from "../controllers/usuarioController.js";

import verifyToken from "../../middlewares/verifyToken.js";

const router = Router();

router.post("/", create);
router.post("/login", verifyToken, login);
router.get("/info", verifyToken, userInfo);
router.get("/logout", logout);

export default router;
