import { Sequelize } from "sequelize";

export const db = new Sequelize("proyectofinal", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  // logging: false
});

export const dbConnection = async () => {
  try {
    await db.authenticate();
    console.log("Db connected");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const syncDb = async () => {
  await db.sync({ force: true });
};
