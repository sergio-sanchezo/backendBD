import { DataTypes } from "sequelize";
import { db } from "../database/config";
import referencePoint from "./referencePoint";

const culturalWell = db.define(
  "culturalwells",
  {
    ctw_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ctw_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ctw_createdDate: { type: DataTypes.DATEONLY, allowNull: true },
    ctw_address: { type: DataTypes.STRING, allowNull: false },
    ctw_phone: { type: DataTypes.STRING, allowNull: true },
    ctw_name: { type: DataTypes.STRING, allowNull: false },
    ctw_director: { type: DataTypes.STRING, allowNull: false },
    ctw_webSite: { type: DataTypes.STRING, allowNull: false },
    ctw_referencePoint: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: referencePoint,
        key: "rfp_id",
      },
    },
  },
  {
    timestamps: false,
  }
);

export default culturalWell;
