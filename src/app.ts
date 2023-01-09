import dotenv from "dotenv";
import { ServerModel } from "./models/";

dotenv.config();

const app = new ServerModel();

const server = app.listen();
export { app, server };
