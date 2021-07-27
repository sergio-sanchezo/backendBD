"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// @ts-ignore
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("./routes/auth"));
const config_1 = __importDefault(require("./database/config"));
// init
var fileEnv = path_1.default.join(__dirname, "./.env");
dotenv_1.default.config({ path: fileEnv });
const app = express_1.default();
// DB
config_1.default();
// CORS
app.use(cors_1.default());
// directorio publico
app.use(express_1.default.static(path_1.default.join(__dirname, "./public")));
// CORS
// middlewares
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
// global variables
// Routes
app.use("/api/auth", auth_1.default);
// starting the server
app.listen(process.env.PORT, () => {
  console.log(
    `Server on port ${process.env.PORT || 4000}, url http://localhost:${
      process.env.PORT || 4000
    }`
  );
});
