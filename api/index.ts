import "module-alias/register";
import dotenv from "dotenv";

dotenv.config();

import express, { urlencoded, json } from "express";
import { getLogger } from "log4js";
import cors from "cors";

import Routes from "../src/Routes";
import { loggerMiddleware } from "../src/middlewares/LoggerMiddlewares";
import { initLogger } from "../src/utilities/logging/Logger";
import { ErrorHandler } from "../src/middlewares/ErrorHandlerMiddlewares";
import { corsConfig } from "../src/configs/CorsConfigs";

const { LOG_LVL = "info", PORT = 3000, NODE_ENV = "development" } = process.env;

const app = express();
initLogger(LOG_LVL);

app.use(cors(corsConfig));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(loggerMiddleware);

app.use("/api", Routes);

app.use(ErrorHandler);

NODE_ENV !== "production" &&
  app.listen(PORT, () => {
    getLogger().info("server listening on", PORT);
  });

export default app;
