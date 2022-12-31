import { DataTypes, Sequelize } from "sequelize";
import database from "../database/connection";

const modelName: string =
  (process.env.DATABASE_BOOK_AUTHORS_MODEL_NAME as string) ?? "";

const bookModelName: string =
  (process.env.DATABASE_BOOK_MODEL_NAME as string) ?? "";

const authorModelName: string =
  (process.env.DATABASE_AUTHORS_MODEL_NAME as string) ?? "";

export const BooksAuthors = database.define(
  modelName,
  {
    bookId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "book_id",
      references: {
        model: bookModelName,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    authorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "author_id",
      references: {
        model: authorModelName,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
      defaultValue: DataTypes.NOW,
    }
  },
  {
    timestamps: false,
  }
);

export default BooksAuthors;
