import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { logError, logSuccess } from "./logColors";

const connectionOptions: ConnectionOptions = {
  type: "mysql",
  url: process.env.MYSQL_DB_URL,
  ssl: false,
  synchronize: true,
  logging: false,
  entities: ["entity/*.ts"],
};

export default { options: connectionOptions };
