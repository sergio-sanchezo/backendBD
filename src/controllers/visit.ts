import express from "express";
import { QueryTypes } from "sequelize";
import { db } from "../database/config";
import Visit from "../models/visit";

export const createVisitByUser = async (req: any, res: express.Response) => {
  const { body } = req;

  try {
    const visits = await db.query(
      "SELECT * FROM visits where vst_referencePointSection = ? AND vst_user = ?",
      {
        model: Visit,
        replacements: [body.referencePointSection, body.user],
        type: QueryTypes.SELECT,
      }
    );
    if (visits.length > 0) {
      return res.status(400).json({
        ok: false,
        msg: "Visita ya planeada",
      });
    } else {
      await db.query("CALL createVisit(?, ?, ?)", {
        replacements: [body.referencePointSection, body.user, body.arriveDate],
      });
      res.status(201).json({
        ok: true,
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

export const getVisitView = async (req: any, res: express.Response) => {
  try {
    const results = await db.query("SELECT * FROM vw_visits", {
      type: QueryTypes.SELECT,
    });
    res.json({
      ok: true,
      msg: "getVisitView View",
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
