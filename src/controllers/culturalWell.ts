import express from "express";
import { QueryTypes } from "sequelize";
import { db } from "../database/config";
import culturalWell from "../models/culturalWell";

export const getCulturalWell = async (req: any, res: express.Response) => {
  try {
    const results = await db.query("SELECT * FROM culturalwells", {
      model: culturalWell,
      type: QueryTypes.SELECT,
    });
    res.json({
      ok: true,
      msg: "getCulturalWell",
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

export const createCulturalWell = async (
  req: express.Request,
  res: express.Response
) => {
  const { body } = req;
  try {
    await db.query(
      "INSERT INTO culturalwells (ctw_email, ctw_createdDate, ctw_address, ctw_phone, ctw_name, ctw_director, ctw_webSite ) VALUES (?, ?, ?, ?, ?, ?, ?)",
      {
        model: culturalWell,
        replacements: [
          body.email,
          body.createdDate,
          body.address,
          body.phone,
          body.name,
          body.director,
          body.website,
        ],
        type: QueryTypes.INSERT,
      }
    );
    return res.status(201).json({
      ok: true,
      msg: "createCulturalWell",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const updateCulturalWell = async (req: any, res: express.Response) => {
  const { body } = req;
  try {
    const ctw = await culturalWell.findByPk(body.id);
    if (!ctw) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un bien de interés con el id " + body.id,
      });
    }
    await ctw.update(body);
    res.status(200).json({
      ok: true,
      ctw,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const deleteCulturalWell = async (req: any, res: express.Response) => {
  const { body } = req;
  try {
    await db.query("DELETE FROM culturalwells WHERE ctw_id = ?", {
      model: culturalWell,
      replacements: [body.ctw_id],
      type: QueryTypes.DELETE,
    });
    return res.status(200).json({
      ok: true,
      msg: "deleteCulturalWell",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const groupedRpByAmount = async (req: any, res: express.Response) => {
  try {
    const results = await db.query(
      "SELECT ctw_name as ctw, count(rfp_id) as amount FROM culturalwells LEFT JOIN referencepoints ON referencepoints.rfp_culturalWell = culturalwells.ctw_id GROUP BY ctw_name",
      {
        type: QueryTypes.SELECT,
      }
    );
    res.json({
      ok: true,
      results,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const groupedQRByAmount = async (req: any, res: express.Response) => {
  try {
    const results = await db.query(
      "SELECT  ctw_name as ctw, count(qr_id) as amount FROM culturalwells LEFT JOIN qrs ON qrs.qr_culturalWell = culturalwells.ctw_id GROUP BY ctw_name",
      {
        type: QueryTypes.SELECT,
      }
    );
    res.json({
      ok: true,
      results,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};
