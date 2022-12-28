import { DataTypes } from "sequelize";
import database from "../db/connection";

const modelName: string =
  (process.env.DATABASE_BOOK_MODEL_NAME as string) ?? "";

export const Book = database.define(modelName, {
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  updatedAt: {
    type: DataTypes.TIME,
  },
  createdAt: {
    type: DataTypes.TIME,
  },
});
