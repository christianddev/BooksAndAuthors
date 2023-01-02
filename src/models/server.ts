import express, { Application } from "express";
import { authorRouter, bookRouter } from "../routes/";
import cors from "cors";

import database from "../database/connection";

const booksPath = `${(process.env.SERVER_BASE_URL as string) ?? ""}${
  (process.env.SERVER_URL_BOOKS as string) ?? ""
}`;
const authorsPath = `${(process.env.SERVER_BASE_URL as string) ?? ""}${
  (process.env.SERVER_URL_AUTHORS as string) ?? ""
}`;

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    books: booksPath,
    authors: authorsPath,
  };

  constructor() {
    this.app = express();
    this.port = (process.env.SERVER_PORT as string) ?? "";

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await database.authenticate();
      console.log("Database online");
    } catch (error) {
      // TODO: manage this
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
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port " + this.port);
    });
  }
}

export default Server;
