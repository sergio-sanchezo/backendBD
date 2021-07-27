import { DataTypes } from "sequelize";
import { db } from "../database/config";
import culturalWell from "./culturalWell";

const QR = db.define(
  "QRs",
  {
    qr_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    qr_image: { type: DataTypes.STRING, allowNull: false },
    qr_culturalWell: {
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
    initialAutoIncrement: "3000",
  }
);

export default QR;
