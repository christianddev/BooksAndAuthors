import { DataTypes } from "sequelize";
import database from "../db/connection";

const modelName: string =
  (process.env.DATABASE_AUTHORS_MODEL_NAME as string) ?? "";

export const Author = database.define(modelName, {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  country: {
    type: DataTypes.STRING(5),
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

export default Author;
