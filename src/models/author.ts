import { DataTypes, Sequelize } from "sequelize";
import database from "../database/connection";

const modelName: string =
  (process.env.DATABASE_AUTHORS_MODEL_NAME as string) ?? "";

export const Author = database.define(
  modelName,
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_deleted",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
    },
  },
  {
    timestamps: true,
  }
);

export default Author;
