import express from "express";
import { QueryTypes } from "sequelize";
import { db } from "../database/config";
import referencePointSection from "../models/referencePointSection";

export const getreferencePointSection = async (
  req: any,
  res: express.Response
) => {
  try {
    const results = await db.query("SELECT * FROM referencePointSections", {
      model: referencePointSection,
      type: QueryTypes.SELECT,
    });
    res.json({
      ok: true,
      msg: "getreferencePointSection",
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

export const createreferencePointSection = async (
  req: express.Request,
  res: express.Response
) => {
  const { body } = req;
  try {
    await db.query(
      "INSERT INTO referencePointSections (rps_name, rps_image, rps_description, rps_referencePoint ) VALUES (?, ?, ?, ?)",
      {
        model: referencePointSection,
        replacements: [
          body.name,
          body.image,
          body.description,
          body.referencePoint,
        ],
        type: QueryTypes.INSERT,
      }
    );
    return res.status(201).json({
      ok: true,
      msg: "createreferencePointSection",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const updatereferencePointSection = async (
  req: any,
  res: express.Response
) => {
  const { body } = req;
  console.log(body);
  try {
    const rps = await referencePointSection.findByPk(body.id);
    if (!rps) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un punto de referencia con el id " + body.id,
      });
    }
    await rps.update(body);
    res.status(200).json({
      ok: true,
      rps,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const deletereferencePointSection = async (
  req: any,
  res: express.Response
) => {
  const { body } = req;
  try {
    await db.query("DELETE FROM referencePointSections WHERE rps_id = ?", {
      model: referencePointSection,
      replacements: [body.rps_id],
      type: QueryTypes.DELETE,
    });
    return res.status(200).json({
      ok: true,
      msg: "deletereferencePointSection",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};
