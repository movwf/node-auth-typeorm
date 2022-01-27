require("dotenv-safe").config();
import cors from "cors";
import express from "express";
import routes from "./routes";
import session from "express-session";
import { createConnection } from "typeorm";

import db from "./config/mysql";
import { corsOptions } from "./config/cors";
import { sessionOptions } from "./config/session";

import logColors, { logSuccess } from "./config/logColors";

(async () => {
  const app = express();
  const conn = await createConnection(db.options);

  app.set("trust proxy", 1);
  app.use(session(sessionOptions(conn)));

  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(routes);

  const PORT = process.env.PORT || 9000;
  app.listen(PORT, () => {
    console.log(`
   █████╗ ██╗   ██╗████████╗██╗  ██╗     █████╗ ██████╗ ██╗
  ██╔══██╗██║   ██║╚══██╔══╝██║  ██║    ██╔══██╗██╔══██╗██║
  ███████║██║   ██║   ██║   ███████║    ███████║██████╔╝██║
  ██╔══██║██║   ██║   ██║   ██╔══██║    ██╔══██║██╔═══╝ ██║
  ██║  ██║╚██████╔╝   ██║   ██║  ██║    ██║  ██║██║     ██║
  ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝     ╚═╝  
  `);
    logSuccess("Authentication Server v1.1.0");
    console.log(
      logColors.BgCyan,
      logColors.FgBlack,
      `App started @ localhost:${PORT}`,
      logColors.Reset
    );
    if (conn) logSuccess("DB: Connection established.");
    else logSuccess("DB: Connection error.");
  });
})();
