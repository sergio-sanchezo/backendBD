"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const Usuario = config_1.db.define("Usuario", {
    nombre: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    apellido: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    rol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "visitante",
    },
    contraseña: { type: sequelize_1.DataTypes.STRING, allowNull: false },
}, {
    timestamps: false,
});
exports.default = Usuario;
