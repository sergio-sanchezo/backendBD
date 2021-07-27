/* 
    Rutas de Bienes de interes cultutal / user
    host + /api/user
*/

import { Router } from "express";
import {
  createuser,
  deleteuser,
  getuser,
  updateuser,
} from "../controllers/user";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.use(validateJWT);

router.get("/", getuser);
router.post("/", createuser);
router.put("/", updateuser);
router.delete("/", deleteuser);

export default router;
