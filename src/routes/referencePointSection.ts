/* 
    Rutas de referencePointSection / referencePointSection
    host + /api/referencePointSection
*/

import { Router } from "express";
import {
  createreferencePointSection,
  deletereferencePointSection,
  getreferencePointSection,
  getReferencePointSectionView,
  updatereferencePointSection,
} from "../controllers/referencePointSection";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.use(validateJWT);

// CRUD
router.get("/", getreferencePointSection);
router.post("/", createreferencePointSection);
router.put("/", updatereferencePointSection);
router.delete("/", deletereferencePointSection);

// VIEWS
router.get("/view", getReferencePointSectionView);

export default router;
