import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const databaseName: string = (process.env.DATABASE_NAME as string) ?? "";
const databaseUser: string = (process.env.DATABASE_USER as string) ?? "";
const databasePassword: string =
  (process.env.DATABASE_PASSWORD as string) ?? "";
const databaseHost: string = (process.env.DATABASE_HOST as string) ?? "";
const databasePort: string = process.env.DATABASE_PORT ?? "";
const databaseDialect: Dialect =
  (process.env.DATABASE_DIALECT as Dialect) ?? "mysql";
const databaseLogging: boolean = Boolean(
  process.env.DATABASE_LOGGING as string
);

const database = new Sequelize(databaseName, databaseUser, databasePassword, {
  host: `${databaseHost}${databasePort ? ":" + databasePort : ""}`,
  dialect: databaseDialect,
  logging: databaseLogging,
});

export default database;
