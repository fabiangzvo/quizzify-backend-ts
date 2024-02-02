import {
  createConnection as mongooseCreateConnection,
  Connection,
} from "mongoose";
import { getLogger } from "log4js";

const connections = new Map<string, Connection>();

export function createConnection(
  connectionName: string,
  connectionString: string,
  user: string,
  pass: string,
  dbName: string
): any {
  const logger = getLogger();

  if (!connections.has(connectionString)) {
    const conn = mongooseCreateConnection(connectionString, {
      user,
      pass,
      dbName,
    });

    conn
      .on("error", (err: Error) =>
        logger.info(
          "error",
          `[mongodb] Connection error with ${connectionName}: ${err.message}`
        )
      )
      .on("open", () =>
        logger.info("info", `[mongodb] Connected to ${connectionName}`)
      )
      .on("close", () =>
        logger.info("info", `[mongodb] Closed connection to ${connectionName}`)
      )
      .on("connecting", () =>
        logger.info("info", `[mongodb] Connecting to ${connectionName}`)
      )
      .on("disconnecting", () =>
        logger.info("info", `[mongodb] Disconnecting to ${connectionName}`)
      )
      .on("disconnected", () =>
        logger.info("info", `[mongodb] Disconnected to ${connectionName}`)
      )
      .on("reconnected", () =>
        logger.info("info", `[mongodb] Reconnected to ${connectionName}`)
      );

    connections.set(connectionString, conn);
  }

  return connections.get(connectionString);
}

export const db: Connection = createConnection(
  "QUIZ_APP_DB",
  process.env.DATABASE_URI,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  process.env.DATABASE_NAME
);
