/* 
    Rutas de autores / author
    host + /api/author
*/

import { Router } from "express";
import {
  createauthor,
  deleteauthor,
  getauthor,
  updateauthor,
} from "../controllers/author";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.use(validateJWT);

router.get("/", getauthor);
router.post("/", createauthor);
router.put("/", updateauthor);
router.delete("/", deleteauthor);

export default router;
