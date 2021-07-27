import express from "express";
import { QueryTypes } from "sequelize";
import { db } from "../database/config";
import referencePoint from "../models/referencePoint";

export const getreferencePoint = async (req: any, res: express.Response) => {
  try {
    const results = await db.query("SELECT * FROM referencePoints", {
      model: referencePoint,
      type: QueryTypes.SELECT,
    });
    return res.json({
      ok: true,
      msg: "getreferencePoint",
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

export const createreferencePoint = async (
  req: express.Request,
  res: express.Response
) => {
  const { body } = req;
  console.log(body.createdDate);
  try {
    await db.query(
      "INSERT INTO referencePoints (rfp_name, rfp_createdDate, rfp_description, rfp_location, rfp_summary ) VALUES (?, ?, ?, ?, ?)",
      {
        model: referencePoint,
        replacements: [
          body.name,
          body.createdDate,
          body.description,
          body.location,
          body.summary,
        ],
        type: QueryTypes.INSERT,
      }
    );
    return res.status(201).json({
      ok: true,
      msg: "createreferencePoint",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const updatereferencePoint = async (req: any, res: express.Response) => {
  const { body } = req;
  try {
    const rfp = await referencePoint.findByPk(body.id);
    if (!rfp) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un punto de referencia con el id " + body.id,
      });
    }
    await rfp.update(body);
    res.status(200).json({
      ok: true,
      rfp,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const deletereferencePoint = async (req: any, res: express.Response) => {
  const { body } = req;
  try {
    await db.query("DELETE FROM referencePoints WHERE rfp_id = ?", {
      model: referencePoint,
      replacements: [body.rfp_id],
      type: QueryTypes.DELETE,
    });
    return res.status(200).json({
      ok: true,
      msg: "deletereferencePoint",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};
