import { BooksAuthorsModel } from "../models";
import type { OperationResponse } from "../typings/api";
import { findAuthorById } from "./authorDatabase";

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

  const author = await findAuthorById(authorId);

  if (!author) {
    return {
      error: {
        message: `no author related to ID '${authorId}'`,
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
