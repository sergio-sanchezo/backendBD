import express from "express";
import { QueryTypes, where } from "sequelize";
import { db } from "../database/config";
import Author from "../models/author";
import author from "../models/author";

export const getauthor = async (req: any, res: express.Response) => {
  try {
    const results = await db.query("SELECT * FROM authors", {
      model: author,
      type: QueryTypes.SELECT,
    });
    res.json({
      ok: true,
      msg: "getauthor",
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

export const createauthor = async (
  req: express.Request,
  res: express.Response
) => {
  const { body } = req;
  try {
    await db.query(
      "INSERT INTO authors (aut_name, aut_lastname, aut_referencePoint ) VALUES (?, ?, ?)",
      {
        model: author,
        replacements: [body.name, body.lastname, body.referencePoint],
        type: QueryTypes.INSERT,
      }
    );
    return res.status(201).json({
      ok: true,
      msg: "createauthor",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const updateauthor = async (req: any, res: express.Response) => {
  const { body } = req;
  // console.log(body);
  try {
    const author = await Author.findByPk(body.id);
    if (!author) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un autor con el id " + body.id,
      });
    }
    await author.update(body);
    res.status(200).json({
      ok: true,
      author,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const deleteauthor = async (req: any, res: express.Response) => {
  const { body } = req;
  try {
    await db.query("DELETE FROM authors WHERE aut_id = ?", {
      model: author,
      replacements: [body.aut_id],
      type: QueryTypes.DELETE,
    });
    return res.status(200).json({
      ok: true,
      msg: "deleteauthor",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};
