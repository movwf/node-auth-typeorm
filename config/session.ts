import { TypeormStore } from "connect-typeorm/out";
import { Connection } from "typeorm";

import { Session } from "../entity/session";

export const sessionOptions = (conn: Connection) => {
  const session = conn.getRepository(Session);

  return {
    secret: ["bulldozer", "trekking", "lightyogurt"],
    saveUninitialized: false, // don't create session until something stored
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    },
    store: new TypeormStore({
      cleanupLimit: 2,
      limitSubquery: false,
      ttl: 86400,
    }).connect(session),
  };
};
