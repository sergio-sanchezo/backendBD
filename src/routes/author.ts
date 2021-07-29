/* 
    Rutas de autores / author
    host + /api/author
*/

import { Router } from "express";
import {
  createauthor,
  deleteauthor,
  getauthor,
  getAuthorView,
  updateauthor,
} from "../controllers/author";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.use(validateJWT);

// CRUD
router.get("/", getauthor);
router.post("/", createauthor);
router.put("/", updateauthor);
router.delete("/", deleteauthor);

// VIEWS
router.get("/view", getAuthorView);
export default router;
