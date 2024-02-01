import { RequestHandler, Request } from "express";

import { Logger } from "log4js";

export interface CustomRequest<
  P = { [key: string]: string },
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Record<string, any>,
  Locals extends Record<string, unknown> = Record<string, unknown>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  logger?: Logger;
  transactionId?: string;
}

export function BaseRequestHandler(handler: RequestHandler): RequestHandler {
  return async (req: CustomRequest, res, next): Promise<void> => {
    const { logger = console } = req;
    const section = "BaseRequestHandler";
    logger.info(section, "got request");

    try {
      await handler(req, res, next);
    } catch (err) {
      logger.error(section, "threw error", err);
      next(err);
    }
  };
}

export const MESSAGE_OK = { message: "success" };
