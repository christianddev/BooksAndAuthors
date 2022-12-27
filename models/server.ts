import express, { Application } from "express";
import userRoutes from "../routes/author";
import cors from "cors";

import database from "../db/connection";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    authors: "/api/authors",
  };

  constructor() {
    this.app = express();
    this.port = (process.env.SERVER_PORT as string) ?? "";

    // Métodos iniciales
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await database.authenticate();
      console.log("Database online");
    } catch (error) {
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
    this.app.use(this.apiPaths.authors, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port " + this.port);
    });
  }
}

export default Server;
