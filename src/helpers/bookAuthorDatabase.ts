import { Model } from "sequelize";
import { BooksAuthorsModel } from "../models";
import type { ErrorOperation, OperationResponse } from "../typings/api";
import { finOneAuthorById } from "./authorDatabase";
import { findOneBookById } from "./bookDatabase";
import { EXCLUDE_ORM_FIELDS, SEQUELIZE_FIELDS } from "./constants";

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

export const findBooksAuthorsByBookId = async (bookId?: number) =>
  await BooksAuthorsModel.findAll({
    where: {
      bookId,
    },
  });

export const findBooksAuthorsByAuthorId = async (authorId?: number) =>
  await BooksAuthorsModel.findAll({
    where: {
      authorId,
    },
  });

const createBookAuthorFromModel = async (bookId: number, authorId: number) =>
  await BooksAuthorsModel.create({
    bookId,
    authorId,
  });

export const createBookAuthor = async (
  bookId: number,
  authorId: number
): Promise<OperationResponse> => {
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

  const newBookAuthor = await createBookAuthorFromModel(bookId, authorId);

  return { data: newBookAuthor };
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

export const deleteBooksAuthorsByBookId = async (bookId: number) =>
  await BooksAuthorsModel.destroy({
    where: {
      bookId,
    },
  });

export const deleteBooksAuthorsByAuthorId = async (authorId: number) =>
  await BooksAuthorsModel.destroy({
    where: {
      bookId: authorId,
    },
  });

export const setBooksAuthorsFromBookId = async (
  id: number,
  authors: number[]
) => {
  try {
    const booksAuthors = await createBooksAuthorsByBookId(id, authors);

    return booksAuthors;
  } catch (error) {
    console.trace("error createABookWithAuthors: ", error);
    throw new Error("createABookWithAuthors");
  }
};
