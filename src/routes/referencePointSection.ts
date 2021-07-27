/* 
    Rutas de referencePointSection / referencePointSection
    host + /api/referencePointSection
*/

import { Router } from "express";
import {
  createreferencePointSection,
  deletereferencePointSection,
  getreferencePointSection,
  updatereferencePointSection,
} from "../controllers/referencePointSection";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.use(validateJWT);

router.get("/", getreferencePointSection);
router.post("/", createreferencePointSection);
router.put("/", updatereferencePointSection);
router.delete("/", deletereferencePointSection);

export default router;
