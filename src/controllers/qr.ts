import express from "express";
import { QueryTypes } from "sequelize";
import { db } from "../database/config";
import QRCode from "qrcode";
import QR from "../models/qr";
import culturalWell from "../models/culturalWell";

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
  // console.log(body.culturalWell[0]);
  try {
    const ctw: any = await db.query(
      "SELECT * FROM culturalwells WHERE culturalwells.ctw_id = ?",
      {
        model: culturalWell,
        replacements: [body.culturalWell[0]],
        type: QueryTypes.SELECT,
      }
    );
    console.log(ctw[0].dataValues);
    const QRinfo = {
      email: ctw[0].dataValues.ctw_email,
      phone: ctw[0].dataValues.ctw_phone,
      webSite: ctw[0].dataValues.ctw_webSite,
    };
    const toEncode = JSON.stringify(QRinfo);

    QRCode.toDataURL(toEncode, async function (err: any, url: any) {
      if (err) {
        return res.status(500).json({
          ok: false,
          msg: "Por favor contacte a un administrador",
        });
      }
      const info = {} as any;
      info.image = url;
      info.culturalWell = body.culturalWell;
      await db.query(
        "INSERT INTO QRs (qr_image, qr_culturalWell ) VALUES (?, ?)",
        {
          model: QR,
          replacements: [info.image, info.culturalWell],
          type: QueryTypes.INSERT,
        }
      );
      return res.status(201).json({
        ok: true,
        msg: "success",
      });
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

export const makeQr = async (req: any, res: express.Response) => {
  try {
    const toEncode = JSON.stringify(req.body);
    QRCode.toDataURL(toEncode, function (err: any, url: any) {
      if (err) return console.log("error occured");
      res.json({
        url,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
