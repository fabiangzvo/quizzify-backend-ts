import { Response } from "express";

import { HttpError } from "@utilities/http/HttpErrors";
import { CustomRequest } from "@utilities/http/HttpUtils";

const errMessageContainsError = (message): boolean =>
  message.search("message") > -1 && message.search("statusCode") > -1;

const getErrorMessage = ({
  statusCode,
  message,
  meta,
  error,
}): Error | HttpError => {
  const errorMessage = error || {
    message,
    statusCode,
    meta,
  };

  if (errMessageContainsError(message)) {
    return JSON.parse(message.match(/{.+?}/g)) || errorMessage;
  }

  return errorMessage;
};

export function ErrorHandler(
  err,
  req: CustomRequest,
  res: Response,
  next: never
): void {
  const { logger = console } = req;
  const { statusCode = 500, message = "Server error", meta, error } = err;

  const errorMessage = getErrorMessage({
    statusCode,
    message,
    meta,
    error,
  });

  logger.error(`ERROR: ${JSON.stringify(errorMessage)}`);

  res.status(statusCode).send(errorMessage);
}
