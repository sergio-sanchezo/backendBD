/* 
    Rutas de referencePoint / referencePoint
    host + /api/referencePoint
*/

import { Router } from "express";
import {
  countReferencePoints,
  createreferencePoint,
  deletereferencePoint,
  getreferencePoint,
  getReferencePointView,
  updatereferencePoint,
} from "../controllers/referencePoint";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.use(validateJWT);

// CRUD
router.get("/", getreferencePoint);
router.post("/", createreferencePoint);
router.put("/", updatereferencePoint);
router.delete("/", deletereferencePoint);

// VIEWS
router.get("/view", getReferencePointView);

// QUERIES
router.get("/total", countReferencePoints);

export default router;
