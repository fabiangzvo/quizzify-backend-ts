import Ajv, { Options, Plugin } from "ajv";
import addFormats from "ajv-formats";

import { ErrorMeta, HttpError } from "./HttpErrors";

let ajv = addFormats(new Ajv({ removeAdditional: true }));

ajv.addFormat("date-time", function (dateTimeString) {
  try {
    let date: Date = null;

    if (typeof dateTimeString === "string") {
      date = new Date(dateTimeString);
    }

    return !!date;
  } catch (e) {
    return false;
  }
});

function formatError(errors): string {
  const validationError = errors[0];
  const { message, dataPath } = validationError;

  return `${dataPath ? `${dataPath.replace(".", "")} ` : ""}${message.replace(
    ".",
    ""
  )}`;
}

export function schemasValidation(schema: unknown, data: unknown): void {
  const validator = ajv.compile(schema);

  const isValid = validator(data);

  if (isValid) return;

  const errorMessage = formatError(validator.errors);

  throw new HttpError(errorMessage, 400, {
    errors: validator.errors as unknown as ErrorMeta[],
  });
}
