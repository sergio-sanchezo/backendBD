/* 
    Rutas de usuarios / Auth
    host + /api/auth
*/

import { Router } from "express";
import {
  createUserAdmin,
  createUserVisitant,
  login,
  revalidateToken,
} from "../controllers/auth";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.post("/new", createUserVisitant);

router.post("/", login);

router.post("/newAdmin", createUserAdmin);

router.get("/renew", validateJWT, revalidateToken);

export default router;
