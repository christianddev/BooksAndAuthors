import { Model } from "sequelize";
import { BooksAuthorsModel } from "../models";
import type { ErrorOperation, OperationResponse } from "../typings/api";
import { finOneAuthorById } from "./authorDatabase";
import { findOneBookById } from "./bookDatabase";
import { EXCLUDE_ORM_FIELDS, SEQUELIZE_FIELDS } from "./constants";

export interface BookAuthorQuery {
  bookId: string;
  authorId: string;
  excludeTemporaryDeleted?: boolean;
  excludeORMFields?: boolean;
}
export const findOneBookAuthorByIds = async ({
  bookId,
  authorId,
  excludeORMFields = EXCLUDE_ORM_FIELDS,
}: BookAuthorQuery) =>
  await BooksAuthorsModel.findOne({
    where: {
      bookId,
      authorId,
    },
    attributes: {
      exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
    },
  });

export const findBooksAuthorsByBookId = async (bookId: string) =>
  await BooksAuthorsModel.findAll({
    where: {
      bookId,
    },
  });

const createBookAuthorFromModel = async (bookId: string, authorId: string) =>
  await BooksAuthorsModel.create({
    bookId,
    authorId,
  });

export const createBookAuthor = async (
  bookId: string = "",
  authorId: string = ""
): Promise<OperationResponse> => {
  if (!bookId || !authorId) {
    return {
      error: { message: `check bookId '${bookId}' and authorId ${bookId}` },
    };
  }

  const book = await findOneBookById(bookId, true);

  if (!book) {
    return {
      error: {
        message: `book with id '${bookId}' not found`,
      },
    };
  }

  const author = await finOneAuthorById(authorId, true);

  if (!author) {
    return {
      error: {
        message: `author with id '${authorId}' not found`,
      },
    };
  }

  const bookAuthor = await findOneBookAuthorByIds({
    bookId,
    authorId,
  });

  if (bookAuthor) {
    return {
      error: {
        message: `there is an author with the bookId '${bookId}' & authorId '${authorId}'`,
      },
    };
  }

  const newBookAuthor = await createBookAuthorFromModel(bookId, authorId);

  return { data: newBookAuthor };
};

export const createBooksAuthorsByBook = async (
  bookId: string = "",
  authorsIds: string[]
): Promise<OperationResponse<Model<any, any>[], ErrorOperation[]>> =>
  new Promise(async (resolve, reject) => {
    try {
      const booksAuthorResult: OperationResponse<
        Model<any, any>[],
        ErrorOperation[]
      > = {
        data: [],
        error: [],
      };
      for (let i = 0; i < authorsIds?.length; i++) {
        const newAuthor = await createBookAuthor(bookId, authorsIds[i]);
        if (newAuthor?.error?.message) {
          booksAuthorResult?.error?.push(newAuthor?.error);
        } else {
          booksAuthorResult?.data?.push(newAuthor?.data?.dataValues);
        }
      }
      resolve(booksAuthorResult);
    } catch (error) {
      console.trace("createBooksAuthorsByBook: ", error);
      reject(error);
    }
  });

export const createBooksAuthorsByAuthor = async (
  authorId: string = "",
  booksIds: string[]
): Promise<OperationResponse<Model<any, any>[], ErrorOperation[]>> =>
  new Promise(async (resolve, reject) => {
    try {
      const booksAuthorResult: OperationResponse<
        Model<any, any>[],
        ErrorOperation[]
      > = {
        data: [],
        error: [],
      };
      for (let i = 0; i < booksIds?.length; i++) {
        const newAuthor = await createBookAuthor(booksIds[i], authorId);
        if (newAuthor?.error?.message) {
          booksAuthorResult?.error?.push(newAuthor?.error);
        } else {
          booksAuthorResult?.data?.push(newAuthor?.data?.dataValues);
        }
      }
      resolve(booksAuthorResult);
    } catch (error) {
      console.trace("createBooksAuthorsByAuthor: ", error);
      reject(error);
    }
  });
