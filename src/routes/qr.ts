/* 
    Rutas de QR / QR
    host + /api/qr
*/

import { Router } from "express";
import {
  createQR,
  deleteQR,
  getQR,
  getQRView,
  updateQR,
} from "../controllers/qr";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.use(validateJWT);

// CRUD
router.get("/", getQR);
router.post("/", createQR);
router.put("/", updateQR);
router.delete("/", deleteQR);

// VIEWS
router.get("/view", getQRView);

export default router;
