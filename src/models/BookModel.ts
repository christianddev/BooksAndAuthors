import { DataTypes } from "sequelize";

import database from "../database/connection";
import { BOOK_MODEL_NAME } from "../helpers/";

export const BookModel = database.define(
  BOOK_MODEL_NAME,
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      field: "isbn",
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

export default BookModel;
