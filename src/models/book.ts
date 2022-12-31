import { DataTypes } from "sequelize";
import database from "../database/connection";

const modelName: string =
  (process.env.DATABASE_BOOK_MODEL_NAME as string) ?? "";

export const Book = database.define(
  modelName,
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(150),
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
      defaultValue: DataTypes.NOW,
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

export default Book;
