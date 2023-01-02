import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import {
  DATABASE_DIALECT,
  DATABASE_HOST,
  DATABASE_LOGGING,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
} from "../helpers/";

dotenv.config();

const database = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: `${DATABASE_HOST}${DATABASE_PORT ? ":" + DATABASE_PORT : ""}`,
    dialect: DATABASE_DIALECT,
    logging: DATABASE_LOGGING,
  }
);

export default database;
