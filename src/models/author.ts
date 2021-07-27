import { DataTypes } from "sequelize";
import { db } from "../database/config";
import referencePoint from "./referencePoint";

const Author = db.define(
  "Authors",
  {
    aut_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    aut_name: { type: DataTypes.STRING, allowNull: false },
    aut_lastname: { type: DataTypes.STRING, allowNull: false },
    aut_referencePoint: {
      type: DataTypes.INTEGER,
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

export default Author;
