import { DataTypes } from "sequelize";
import { db } from "../database/config";

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
    rfp_description: { type: DataTypes.STRING, allowNull: false },
    rfp_location: { type: DataTypes.STRING, allowNull: false },
    rfp_summary: { type: DataTypes.STRING, allowNull: true },
  },
  {
    timestamps: false,
  }
);

export default referencePoint;
