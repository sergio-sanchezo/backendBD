import express from "express";
import bcrypt from "bcryptjs";
import { QueryTypes } from "sequelize";
import { db } from "../database/config";
import user from "../models/user";

export const getuser = async (req: any, res: express.Response) => {
  try {
    const results = await db.query("SELECT * FROM users", {
      model: user,
      type: QueryTypes.SELECT,
    });
    res.json({
      ok: true,
      msg: "getuser",
      results,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const createuser = async (
  req: express.Request,
  res: express.Response
) => {
  const { body } = req;
  try {
    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync(body.password, salt);
    await db.query(
      "INSERT INTO users (usr_name, usr_lastname, usr_email, usr_role, usr_password, usr_document ) VALUES (?, ?, ?, ?, ?, ?)",
      {
        model: user,
        replacements: [
          body.name,
          body.lastname,
          body.email,
          body.role,
          password,
          body.document,
        ],
        type: QueryTypes.INSERT,
      }
    );
    return res.status(201).json({
      ok: true,
      msg: "createuser",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const updateuser = async (req: any, res: express.Response) => {
  const { body } = req;
  console.log(body);
  try {
    const newUser = await user.findByPk(body.id);
    if (!newUser) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con el id " + body.id,
      });
    }
    await newUser.update(body);
    res.status(200).json({
      ok: true,
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const deleteuser = async (req: any, res: express.Response) => {
  const { body } = req;
  try {
    await db.query("DELETE FROM users WHERE usr_document = ?", {
      model: user,
      replacements: [body.usr_document],
      type: QueryTypes.DELETE,
    });
    return res.status(200).json({
      ok: true,
      msg: "deleteuser",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};
