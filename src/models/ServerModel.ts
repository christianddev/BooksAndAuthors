import express, { Application } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "../docs/swagger";

import { bookRouter, authorRouter } from "../routes/v1";
import database from "../database/connection";
import {
  AUTHORS_PATH,
  BOOKS_PATH,
  DOCUMENTATION_PATH,
  SERVER_PORT,
} from "../helpers/";

class ServerModel {
  private app: Application;
  private port: string;
  private apiPaths = {
    books: BOOKS_PATH,
    authors: AUTHORS_PATH,
    documentation: DOCUMENTATION_PATH,
  };

  constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await database.authenticate();
      console.log("Database online");
    } catch (error) {
      console.trace("error when connecting to the db: ", error);
      throw error;
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      express.static((process.env.SERVER_PUBLIC_DIR as string) ?? "")
    );
  }

  routes() {
    this.app.use(this.apiPaths.authors, authorRouter);
    this.app.use(this.apiPaths.books, bookRouter);
    this.app.use(
      this.apiPaths.documentation,
      swaggerUi.serve,
      swaggerUi.setup(swaggerSetup)
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port " + this.port);
    });
  }
}

export default ServerModel;
