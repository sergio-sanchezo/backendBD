/* 
    Rutas de Bienes de interes cultutal / culturalWell
    host + /api/culturalWell
*/

import { Router } from "express";
import {
  createCulturalWell,
  deleteCulturalWell,
  getCulturalWell,
  groupedQRByAmount,
  groupedRpByAmount,
  updateCulturalWell,
} from "../controllers/culturalWell";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.use(validateJWT);

// CRUD
router.get("/", getCulturalWell);
router.post("/", createCulturalWell);
router.put("/", updateCulturalWell);
router.delete("/", deleteCulturalWell);

// QUERY
router.get("/groupedQR", groupedQRByAmount);
router.get("/groupedRp", groupedRpByAmount);

export default router;
