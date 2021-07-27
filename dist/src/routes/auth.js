"use strict";
/*
    Rutas de usuarios / Auth
    host + /api/auth
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const router = express_1.Router();
router.post("/new", auth_1.createUserVisitant);
router.post("/", auth_1.login);
router.get("/renew", auth_1.revalidateToken);
exports.default = router;
