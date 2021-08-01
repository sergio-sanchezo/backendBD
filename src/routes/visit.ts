/* 
    Rutas de visitas / visit
    host + /api/visit
*/

import { Router } from "express";
import { createVisitByUser, getVisitView } from "../controllers/visit";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.use(validateJWT);

// READ VISITS BY USER
router.post("/", createVisitByUser);

// VIEW
router.get("/view", getVisitView);

export default router;
