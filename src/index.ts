import "module-alias/register";
import dotenv from "dotenv";

dotenv.config();

import express, { urlencoded, json } from "express";
import { getLogger } from "log4js";
import cors from "cors";

import Routes from "@Routes";
import { loggerMiddleware } from "@middlewares/LoggerMiddlewares";
import { initLogger } from "@utilities/logging/Logger";
import { ErrorHandler } from "@middlewares/ErrorHandlerMiddlewares";
import { corsConfig } from "@configs/CorsConfigs";

const { LOG_LVL = "info", PORT = 3000 } = process.env;

const app = express();
initLogger(LOG_LVL);

app.use(cors(corsConfig));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(loggerMiddleware);

app.use(Routes);

app.use(ErrorHandler);

app.listen(PORT, () => {
  getLogger().info("server listening on", PORT);
});
