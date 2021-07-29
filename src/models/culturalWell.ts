import { DataTypes } from "sequelize";
import { db } from "../database/config";
import Author from "./author";
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
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    ctw_createdDate: { type: DataTypes.DATEONLY, allowNull: true },
    ctw_address: { type: DataTypes.STRING(150), allowNull: false },
    ctw_phone: { type: DataTypes.STRING(10), allowNull: true },
    ctw_name: { type: DataTypes.STRING(45), allowNull: false },
    ctw_director: { type: DataTypes.STRING(45), allowNull: false },
    ctw_webSite: { type: DataTypes.STRING(255), allowNull: false },
  },
  {
    timestamps: false,
    initialAutoIncrement: "2000",
  }
);

export default culturalWell;
