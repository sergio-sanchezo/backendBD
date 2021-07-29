import express from "express";
import { QueryTypes } from "sequelize";
import { db } from "../database/config";
import QR from "../models/qr";

export const getQR = async (req: any, res: express.Response) => {
  try {
    const results = await db.query("SELECT * FROM QRs", {
      model: QR,
      type: QueryTypes.SELECT,
    });
    res.json({
      ok: true,
      msg: "getQR",
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

export const createQR = async (req: express.Request, res: express.Response) => {
  const { body } = req;
  try {
    await db.query(
      "INSERT INTO QRs (qr_image, qr_culturalWell ) VALUES (?, ?)",
      {
        model: QR,
        replacements: [body.image, body.culturalWell],
        type: QueryTypes.INSERT,
      }
    );
    return res.status(201).json({
      ok: true,
      msg: "createQR",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const updateQR = async (req: any, res: express.Response) => {
  const { body } = req;
  try {
    const qr = await QR.findByPk(body.id);
    if (!qr) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un qr con el id " + body.id,
      });
    }
    await qr.update(body);
    res.status(200).json({
      ok: true,
      qr,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const deleteQR = async (req: any, res: express.Response) => {
  const { body } = req;
  try {
    await db.query("DELETE FROM QRs WHERE qr_id = ?", {
      model: QR,
      replacements: [body.qr_id],
      type: QueryTypes.DELETE,
    });
    return res.status(200).json({
      ok: true,
      msg: "deleteQR",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor contacte a un administrador",
    });
  }
};

export const getQRView = async (req: any, res: express.Response) => {
  try {
    const results = await db.query("SELECT * FROM vw_qrs", {
      type: QueryTypes.SELECT,
    });
    res.json({
      ok: true,
      msg: "getQR View",
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
