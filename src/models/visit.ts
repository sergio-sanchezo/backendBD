import { DataTypes } from "sequelize";
import { db } from "../database/config";
import referencePointSection from "./referencePointSection";
import User from "./user";

const Visit = db.define(
  "Visits",
  {
    vst_referencePointSection: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: referencePointSection,
        key: "rps_id",
      },
    },
    vst_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: User,
        key: "usr_document",
      },
    },
    vst_arriveDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default Visit;
