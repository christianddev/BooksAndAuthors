import { DataTypes } from "sequelize";
import database from "../db/connection";

const modelName: string =
  (process.env.DATABASE_BOOK_MODEL_NAME as string) ?? "";

export const Book = database.define(modelName, {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.TIME,
  },
  updatedAt: {
    type: DataTypes.TIME,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
  },
});


export default Book;