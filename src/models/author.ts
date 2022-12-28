import { DataTypes } from "sequelize";
import database from "../db/connection";

const modelName: string =
  (process.env.DATABASE_AUTHORS_MODEL_NAME as string) ?? "";

export const Author = database.define(modelName, {
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  updatedAt: {
    type: DataTypes.TIME,
  },
  createdAt: {
    type: DataTypes.TIME,
  },
});

export default Author;
