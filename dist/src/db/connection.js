"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("proyectofinal", "root", "password", {
    host: "localhost",
    dialect: "mysql",
    // logging: false
});
exports.default = db;
