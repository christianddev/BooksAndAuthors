import dotenv from "dotenv";
import { ServerModel } from "./models/";

dotenv.config();

const server = new ServerModel();

server.listen();
