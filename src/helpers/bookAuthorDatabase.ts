import { BooksAuthorsModel } from "../models";
import type { OperationResponse } from "../typings/api";
import { finOneAuthorById } from "./authorDatabase";
import { findOneBookById } from "./bookDatabase";
import {
  EXCLUDE_ORM_FIELDS,
  EXCLUDE_TEMPORARY_DELETED,
  SEQUELIZE_FIELDS,
} from "./constants";

export interface BookAuthorQuery {
  bookId: string;
  authorId: string;
  excludeTemporaryDeleted: boolean;
  excludeORMFields: boolean;
}
export const findBookAuthorByIds = async ({
  bookId,
  authorId,
  excludeORMFields = EXCLUDE_ORM_FIELDS,
  excludeTemporaryDeleted = EXCLUDE_TEMPORARY_DELETED,
}: BookAuthorQuery) =>
  await BooksAuthorsModel.findOne({
    where: {
      bookId,
      authorId,
      isDeleted: excludeTemporaryDeleted,
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

  // TODO: move to another function
  const bookAuthor = await BooksAuthorsModel.findOne({
    where: {
      bookId,
      authorId,
    },
  });

  if (bookAuthor) {
    return {
      error: {
        message: `there is an author with the bookId '${bookId}' & authorId '${authorId}'`,
      },
    };
  }

  const newBookAuthor = await BooksAuthorsModel.create({
    bookId,
    authorId,
  });

  return { data: newBookAuthor };
};

export const createAuthorsBooks = async (
  bookId: string = "",
  authorsIds: string[]
): Promise<Array<OperationResponse>> =>
  new Promise(async (resolve, reject) => {
    try {
      const booksAuthorResult = [];
      for (let i = 0; i < authorsIds?.length; i++) {
        const newAuthor = await createBookAuthor(bookId, authorsIds[i]);
        booksAuthorResult.push(newAuthor);
      }
      resolve(booksAuthorResult);
    } catch (error) {
      console.trace("createAuthorsBooks: ", error);
      reject(error);
    }
  });
