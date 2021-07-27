import { DataTypes } from "sequelize";
import { db } from "../database/config";
import referencePoint from "./referencePoint";

const referencePointSection = db.define(
  "referencePointSections",
  {
    rps_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rps_name: { type: DataTypes.STRING, allowNull: false },
    rps_image: { type: DataTypes.STRING, allowNull: false },
    rps_description: { type: DataTypes.STRING, allowNull: true },
    rps_referencePoint: {
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

export default referencePointSection;
