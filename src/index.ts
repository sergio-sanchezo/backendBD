import express from "express";
// @ts-ignore
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import auth from "./routes/auth";
import culturalWell from "./routes/culturalWell";
import author from "./routes/author";
import qr from "./routes/qr";
import referencePoint from "./routes/referencePoint";
import user from "./routes/user";
import visit from "./routes/visit";
import referencePointSection from "./routes/referencePointSection";
import { dbConnection, syncDb } from "./database/config";

// init
var fileEnv = path.join(__dirname, "./.env");
dotenv.config({ path: fileEnv });

const app = express();

// DB
dbConnection();
// syncDb();

// CORS
app.use(cors());

// directorio publico
app.use(express.static(path.join(__dirname, "./public")));

// middlewares
app.use(morgan("dev"));
app.use(express.json());

// global variables

// Routes
app.use("/api/auth", auth);
app.use("/api/author", author);
app.use("/api/culturalWell", culturalWell);
app.use("/api/qr", qr);
app.use("/api/referencePointSection", referencePointSection);
app.use("/api/referencePoint", referencePoint);
app.use("/api/user", user);
app.use("/api/visit", visit);

// starting the server
app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server on port ${process.env.PORT || 4000}, url http://localhost:${
      process.env.PORT || 4000
    }`
  );
});
