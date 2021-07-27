/* 
    Rutas de referencePoint / referencePoint
    host + /api/referencePoint
*/

import { Router } from "express";
import {
  createreferencePoint,
  deletereferencePoint,
  getreferencePoint,
  updatereferencePoint,
} from "../controllers/referencePoint";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.use(validateJWT);

router.get("/", getreferencePoint);
router.post("/", createreferencePoint);
router.put("/", updatereferencePoint);
router.delete("/", deletereferencePoint);

export default router;
