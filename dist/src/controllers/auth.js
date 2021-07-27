"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidateToken = exports.login = exports.createUserVisitant = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const createUserVisitant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const usuario = yield config_1.db.query("SELECT * FROM Usuarios WHERE Usuarios.email = ?", {
            replacements: [data.email],
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (usuario.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: "Un usuario existe con ese correo",
            });
        }
        else {
            // Encriptar contraseña
            const salt = bcryptjs_1.default.genSaltSync();
            const newUser = {
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                password: data.password,
            };
            newUser.password = bcryptjs_1.default.hashSync(data.password, salt);
            yield config_1.db.query("INSERT INTO Usuarios (nombre, apellido, email, contraseña) VALUES (?, ?, ?, ?)", {
                replacements: [
                    newUser.name,
                    newUser.lastname,
                    newUser.email,
                    newUser.password,
                ],
                type: sequelize_1.QueryTypes.INSERT,
            });
            // Generar JWT
            res.status(201).json({
                ok: "true",
                email: data.email,
                name: data.name,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor contacte a un administrador",
        });
    }
});
exports.createUserVisitant = createUserVisitant;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const [usuario] = yield config_1.db.query("SELECT * FROM Usuarios WHERE Usuarios.email = ?", {
            replacements: [email],
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (!usuario) {
            console.log("aqui");
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe con ese email",
            });
        }
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.contraseña);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña Incorrecta",
            });
        }
        // Generar JWT
        res.status(200).json({
            ok: true,
            email: usuario.email,
            name: usuario.nombre,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor contacte a un administrador",
        });
    }
});
exports.login = login;
const revalidateToken = (req, res) => {
    res.json({
        ok: "true",
        msg: "renew",
    });
};
exports.revalidateToken = revalidateToken;
