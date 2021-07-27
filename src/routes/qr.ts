/* 
    Rutas de QR / QR
    host + /api/qr
*/

import { Router } from "express";
import { createQR, deleteQR, getQR, updateQR } from "../controllers/qr";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.use(validateJWT);

router.get("/", getQR);
router.post("/", createQR);
router.put("/", updateQR);
router.delete("/", deleteQR);

export default router;
