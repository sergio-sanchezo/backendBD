import { DataTypes } from "sequelize";
import { db } from "../database/config";
import culturalWell from "./culturalWell";

const referencePoint = db.define(
  "referencePoints",
  {
    rfp_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rfp_name: { type: DataTypes.STRING, allowNull: false },
    rfp_createdDate: { type: DataTypes.DATEONLY, allowNull: true },
    rfp_description: { type: DataTypes.STRING(1500), allowNull: false },
    rfp_location: { type: DataTypes.STRING(150), allowNull: false },
    rfp_summary: { type: DataTypes.STRING(1500), allowNull: true },
    rfp_culturalWell: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: culturalWell,
        key: "ctw_id",
      },
    },
  },
  {
    timestamps: false,
    initialAutoIncrement: "4000",
  }
);

export default referencePoint;
