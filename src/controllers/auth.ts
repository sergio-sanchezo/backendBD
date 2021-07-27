import bcrypt from "bcryptjs";
import express from "express";
import { QueryTypes } from "sequelize";
import { db } from "../database/config";
import { generarJWT } from "../helpers/jwt";
import User from "../models/user";

export const createUserVisitant = async (
  req: express.Request,
  res: express.Response
) => {
  const data = req.body;
  try {
    const user = await db.query(
      "SELECT * FROM users WHERE users.usr_email = ?",
      {
        model: User,
        replacements: [data.email],
        type: QueryTypes.SELECT,
      }
    );
    if (user.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario existe con ese correo",
      });
    } else {
      // Encriptar contraseña
      const salt = bcrypt.genSaltSync();
      const newUser = {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        document: data.document,
      };
      newUser.password = bcrypt.hashSync(data.password, salt);

      await db.query(
        "INSERT INTO users (usr_name, usr_lastname, usr_email, usr_password, usr_document) VALUES (?, ?, ?, ?, ?)",
        {
          model: User,
          replacements: [
            newUser.name,
            newUser.lastname,
            newUser.email,
            newUser.password,
            newUser.document,
          ],
          type: QueryTypes.INSERT,
        }
      );
      // Generar JWT
      // console.log(newUser);
      const token = await generarJWT(newUser);
      res.status(201).json({
        ok: "true",
        email: data.email,
        name: data.name,
        role: "visitante",
        token,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const createUserAdmin = async (
  req: express.Request,
  res: express.Response
) => {
  const data = req.body;
  try {
    const user = await db.query(
      "SELECT * FROM users WHERE users.usr_email = ?",
      {
        model: User,
        replacements: [data.email],
        type: QueryTypes.SELECT,
      }
    );
    if (user.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario existe con ese correo",
      });
    } else {
      // Encriptar contraseña
      const salt = bcrypt.genSaltSync();
      const newUser = {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        document: data.document,
      };
      newUser.password = bcrypt.hashSync(data.password, salt);

      await db.query(
        "INSERT INTO users (usr_name, usr_lastname, usr_email, usr_password, usr_document, usr_role) VALUES (?, ?, ?, ?, ?, ?)",
        {
          model: User,
          replacements: [
            newUser.name,
            newUser.lastname,
            newUser.email,
            newUser.password,
            newUser.document,
            "admin",
          ],
          type: QueryTypes.INSERT,
        }
      );
      // Generar JWT
      // console.log(result);
      const token = await generarJWT(newUser);
      res.status(201).json({
        ok: "true",
        email: data.email,
        name: data.name,
        role: "admin",
        token,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.query<any>(
      "SELECT * FROM users WHERE users.usr_email = ?",
      {
        model: User,
        replacements: [email],
        type: QueryTypes.SELECT,
      }
    );
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email",
      });
    }
    const { dataValues } = user;
    const validPassword = bcrypt.compareSync(password, dataValues.usr_password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña Incorrecta",
      });
    }

    // Generar JWT

    const token = await generarJWT(dataValues);
    // console.log(user);

    res.status(200).json({
      ok: true,
      email: dataValues.usr_email,
      name: dataValues.usr_nombre,
      role: dataValues.usr_role,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const revalidateToken = async (req: any, res: express.Response) => {
  const { role } = req;
  const token = await generarJWT(req.userInfo);
  res.json({
    ok: "true",
    token,
    role,
  });
};
