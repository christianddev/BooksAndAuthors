import { DataTypes } from "sequelize";
import database from "../database/connection";
import {
  AUTHOR_ID_FIELD,
  AUTHOR_MODEL_NAME,
  BOOK_AUTHOR_MODEL_NAME,
  BOOK_ID_FIELD,
  BOOK_MODEL_NAME,
} from "../helpers/";

export const BooksAuthorsModel = database.define(
  BOOK_AUTHOR_MODEL_NAME,
  {
    [BOOK_ID_FIELD]: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "book_id",
      references: {
        model: BOOK_MODEL_NAME,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    [AUTHOR_ID_FIELD]: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "author_id",
      references: {
        model: AUTHOR_MODEL_NAME,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

export default BooksAuthorsModel;
