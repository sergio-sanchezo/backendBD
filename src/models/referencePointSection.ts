import { DataTypes } from "sequelize";
import { db } from "../database/config";
import referencePoint from "./referencePoint";

const referencePointSection = db.define(
  "referencePointSections",
  {
    rps_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rps_name: { type: DataTypes.STRING(45), allowNull: false },
    rps_image: { type: DataTypes.STRING(300), allowNull: false },
    rps_description: { type: DataTypes.STRING(1500), allowNull: true },
    rps_referencePoint: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: referencePoint,
        key: "rfp_id",
      },
    },
  },
  {
    timestamps: false,
    initialAutoIncrement: "5000",
  }
);

export default referencePointSection;
