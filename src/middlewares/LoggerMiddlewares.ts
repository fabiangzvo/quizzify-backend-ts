import { v4 as uuid } from "uuid";
import { getLogger } from "log4js";
import { NextFunction, Response } from "express";

import { CustomRequest } from "@utilities/http/HttpUtils";

export function loggerMiddleware(
  req: CustomRequest,
  _: Response,
  next: NextFunction
): void {
  const transactionId = uuid();
  const logger = getLogger(transactionId);

  req.logger = logger;
  req.transactionId = transactionId;

  logger.info(`${req.method} ${req.url}`);

  next();
}
