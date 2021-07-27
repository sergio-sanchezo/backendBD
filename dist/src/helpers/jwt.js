"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (email, name, lastname) => {
    return new Promise((resolve, reject) => {
        const payload = { email, name, lastname };
        jsonwebtoken_1.default.sign(payload, process.env.SECRET_JWT_SEED);
    });
};
exports.default = generarJWT;
