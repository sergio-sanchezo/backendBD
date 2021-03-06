import { DataTypes } from "sequelize";
import { db } from "../database/config";
import referencePoint from "./referencePoint";

const Author = db.define(
  "Authors",
  {
    aut_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    aut_name: { type: DataTypes.STRING(45), allowNull: false },
    aut_lastname: { type: DataTypes.STRING(45), allowNull: false },
    aut_referencePoint: {
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
    initialAutoIncrement: "1000",
  }
);

export default Author;
