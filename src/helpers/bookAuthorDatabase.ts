import { Model } from "sequelize";

import { BooksAuthorsModel } from "../models";
import { finOneAuthorById } from "./authorDatabase";
import { findOneBookById } from "./bookDatabase";
import { setError } from "../utils";

import { EXCLUDE_ORM_FIELDS, SEQUELIZE_FIELDS } from "./constants";

import type { ErrorOperation, OperationResponse } from "../typings/api";

export interface BookAuthorQuery {
  bookId: number;
  authorId: number;
  excludeTemporaryDeleted?: boolean;
  excludeORMFields?: boolean;
}
export const findOneBookAuthorByIds = async ({
  bookId,
  authorId,
  excludeORMFields = EXCLUDE_ORM_FIELDS,
}: BookAuthorQuery) => {
  try {
    const bookAuthor = await BooksAuthorsModel.findOne({
      where: {
        bookId,
        authorId,
      },
      attributes: {
        exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
      },
    });
    return bookAuthor;
  } catch (error) {
    return setError("findOneBookAuthorByIds", error);
  }
};

export const findBooksAuthorsByBookId = async (
  bookId: number,
  excludeORMFields: boolean
) => {
  try {
    const bookAuthors = await BooksAuthorsModel.findAll({
      where: {
        bookId,
      },
      attributes: {
        exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
      },
    });
    return bookAuthors;
  } catch (error) {
    return setError("findBooksAuthorsByBookId", error);
  }
};

export const findBooksAuthorsByAuthorId = async (
  authorId: number,
  excludeORMFields: boolean
) => {
  try {
    const bookAuthors = await BooksAuthorsModel.findAll({
      where: {
        authorId,
      },
      attributes: {
        exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
      },
    });
    return bookAuthors;
  } catch (error) {
    return setError("findBooksAuthorsByAuthorId", error);
  }
};

const createBookAuthorFromModel = async (bookId: number, authorId: number) => {
  try {
    const bookAuthor = await BooksAuthorsModel.create({
      bookId,
      authorId,
    });
    return bookAuthor;
  } catch (error) {
    return setError("createBookAuthorFromModel", error);
  }
};

const validateBookAuthorData = async (bookId: number, authorId: number) => {
  if (bookId <= 0 || authorId <= 0) {
    return {
      error: { message: `check bookId '${bookId}' and authorId '${bookId}'` },
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
};

export const createBookAuthor = async (
  bookId: number,
  authorId: number
): Promise<OperationResponse> => {
  try {
    const response = await validateBookAuthorData(bookId, authorId);
    if (response?.error) {
      return response;
    }

    const newBookAuthor = await createBookAuthorFromModel(bookId, authorId);

    return { data: newBookAuthor };
  } catch (error) {
    return setError("createBookAuthorFromModel", error);
  }
};

const createBooksAuthorsByIds = (
  bookIds: number[],
  authorsIds: number[]
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

      for (let a = 0; a < bookIds?.length; a++) {
        for (let i = 0; i < authorsIds?.length; i++) {
          const newAuthor = await createBookAuthor(bookIds[a], authorsIds[i]);
          if (newAuthor?.error?.message) {
            booksAuthorResult?.error?.push(newAuthor?.error);
          } else {
            booksAuthorResult?.data?.push(newAuthor?.data?.dataValues);
          }
        }
      }
      resolve(booksAuthorResult);
    } catch (error) {
      console.trace("createBooksAuthorsByIds: ", error);
      reject(error);
    }
  });

export const createBooksAuthorsByBookId = async (
  bookId: number,
  authorsIds: number[] = []
): Promise<OperationResponse<Model<any, any>[], ErrorOperation[]>> =>
  await createBooksAuthorsByIds([bookId], authorsIds);

export const createBooksAuthorsByAuthorId = async (
  authorId: number,
  booksIds: number[] = []
): Promise<OperationResponse<Model<any, any>[], ErrorOperation[]>> =>
  await createBooksAuthorsByIds(booksIds, [authorId]);

export const deleteBooksAuthorsByBookId = async (bookId: number) => {
  try {
    const response = await BooksAuthorsModel.destroy({
      where: {
        bookId,
      },
    });
    return response;
  } catch (error) {
    return setError("deleteBooksAuthorsByBookId", error);
  }
};

export const deleteBooksAuthorsByAuthorId = async (authorId: number) => {
  try {
    const response = await BooksAuthorsModel.destroy({
      where: {
        authorId,
      },
    });
    return response;
  } catch (error) {
    return setError("deleteBooksAuthorsByAuthorId", error);
  }
};

export const setBooksAuthorsFromBookId = async (
  id: number,
  authors: number[]
) => {
  try {
    const booksAuthors = await createBooksAuthorsByBookId(id, authors);

    return booksAuthors;
  } catch (error) {
    return setError("setBooksAuthorsFromBookId", error);
  }
};
