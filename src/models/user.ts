import { DataTypes } from "sequelize";
import { db } from "../database/config";

const User = db.define(
  "Users",
  {
    usr_name: { type: DataTypes.STRING, allowNull: false },
    usr_lastname: { type: DataTypes.STRING, allowNull: false },
    usr_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    usr_role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "visitante",
    },
    usr_password: { type: DataTypes.STRING, allowNull: false },
    usr_document: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);

export default User;
