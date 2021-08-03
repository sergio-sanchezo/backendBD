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
  makeQr,
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

// QR
router.post("/makeQr", makeQr);

// VIEWS
router.get("/view", getQRView);

export default router;
