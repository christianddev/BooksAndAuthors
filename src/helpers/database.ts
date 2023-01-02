import { Model } from "sequelize";
import {
  Author as AuthorModel,
  Book as BookModel,
  BooksAuthors,
} from "../models";
import type { OperationResponse } from "../typings/api";
import type { Author, CreateAuthor } from "../typings/author";
import type { CreateBook } from "../typings/book";

export const findOneBookByTitle = async ({ title = "" }: { title: string }) =>
  await BookModel.findOne({
    where: {
      title,
    },
  });

export const findOneAuthorByNameAndCountry = async ({
  name = "",
  country = "",
}: Author) =>
  await AuthorModel.findOne({
    where: {
      name,
      country,
    },
  });

export const findBooksAuthorsByBookId = async (bookId: string) =>
  await BooksAuthors.findAll({
    where: {
      bookId,
    },
  });

export const createBook = async (
  rawBook: CreateBook
): Promise<OperationResponse> => {
  if (!rawBook?.title) {
    return { error: { message: "check book data" } };
  }

  const book = await findOneBookByTitle({ title: rawBook?.title });

  if (book) {
    return {
      error: { message: `there is a book with the title '${rawBook?.title}'` },
    };
  }
  const newBook = await BookModel.create({
    title: rawBook?.title,
  });

  return { data: newBook };
};

export const createAuthor = async (rawAuthor: CreateAuthor) => {
  if (!rawAuthor?.name || !rawAuthor?.country) {
    return { error: "check author data" };
  }

  const author = await findOneAuthorByNameAndCountry({
    name: rawAuthor.name,
    country: rawAuthor.country,
  });

  if (author) {
    return {
      error: `there is an author with the name "${rawAuthor.name}" & country "${rawAuthor.country}"`,
    };
  }

  const newAuthor = await AuthorModel.create({
    name: rawAuthor?.name,
    country: rawAuthor?.country,
  });

  return newAuthor;
};

// const createAuthorsFromBook = async (rawAuthors: CreateAuthor[]) =>
//   new Promise(async (resolve, reject) => {

//     try {
//       const newAuthors = [];
//       for (let i = 0; i < rawAuthors.length; i++) {
//         const newAuthor = await createAuthor(rawAuthors[i]);
//         newAuthors.push(newAuthor);
//       }
//       resolve(newAuthors);
//     } catch (error) {
//       console.trace("createAuthorsFromBook: ", error);
//       reject(error);
//     }
//   });

export const createBookAuthor = async (
  bookId: string,
  authorId: string
): Promise<OperationResponse> => {
  if (!bookId || !authorId) {
    return {
      error: { message: `check bookId '${bookId}' and authorId ${bookId}` },
    };
  }

  const bookAuthor = await BooksAuthors.findOne({
    where: {
      bookId,
      authorId,
    },
  });

  if (bookAuthor) {
    return {
      error: {
        message: `there is an author with the bookId '${bookId}' & authorId "${authorId}"`,
      },
    };
  }

  const newBookAuthor = await BooksAuthors.create({
    bookId,
    authorId,
  });

  return { data: newBookAuthor };
};

const createAuthorsBooks = async (
  bookId: string,
  authorsIds: string[]
): Promise<Array<OperationResponse>> =>
  new Promise(async (resolve, reject) => {
    try {
      const booksAuthorResult = [];
      for (let i = 0; i < authorsIds.length; i++) {
        console.log("bookId, authorsIds[i]", bookId, authorsIds[i]);
        const newAuthor = await createBookAuthor(bookId, authorsIds[i]);
        booksAuthorResult.push(newAuthor);
      }
      resolve(booksAuthorResult);
    } catch (error) {
      console.trace("createAuthorsBooks: ", error);
      reject(error);
    }
  });

// TODO: check response
export const createABookWithAuthors = async (rawBook: CreateBook) => {
  if (!rawBook?.authors?.length) {
    return { error: { message: `check authors data` } };
  }

  try {
    const newBook = await createBook(rawBook);
    console.log("newBook", newBook);
    if (newBook?.error?.message) {
      return { error: newBook?.error };
    }

    const booksAuthors = await createAuthorsBooks(
      newBook?.data?.dataValues?.id,
      rawBook?.authors
    );
    console.log("### booksAuthors", booksAuthors);

    // return await findBooksAuthorsByBookId(newBook?.data?.dataValues?.id);
    return booksAuthors;
  } catch (error) {
    console.log("error createABookWithAuthors: ", error);
    throw new Error("createABookWithAuthors");
  }
};
