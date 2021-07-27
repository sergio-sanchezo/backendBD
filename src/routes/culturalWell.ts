/* 
    Rutas de Bienes de interes cultutal / culturalWell
    host + /api/culturalWell
*/

import { Router } from "express";
import {
  createCulturalWell,
  deleteCulturalWell,
  getCulturalWell,
  updateCulturalWell,
} from "../controllers/culturalWell";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.use(validateJWT);

router.get("/", getCulturalWell);
router.post("/", createCulturalWell);
router.put("/", updateCulturalWell);
router.delete("/", deleteCulturalWell);

export default router;
