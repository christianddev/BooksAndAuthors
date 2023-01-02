import {
  Author as AuthorModel,
  Book as BookModel,
  BooksAuthors,
} from "../models";
import type { OperationResponse } from "../typings/api";
import type { Author, CreateAuthorRequest } from "../typings/author";
import type { CreateBookRequest } from "../typings/book";

export const findOneBookByTitle = async ({ title = "" }: { title: string }) =>
  await BookModel.findOne({
    where: {
      title,
    },
  });

export const findAuthorById = async (id: string) =>
  await AuthorModel.findByPk(id);

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
  rawBook: CreateBookRequest
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

export const createAuthor = async (rawAuthor: CreateAuthorRequest) => {
  if (!rawAuthor?.name || !rawAuthor?.country) {
    return {
      error: {
        message: "check author data",
      },
    };
  }

  const author = await findOneAuthorByNameAndCountry({
    name: rawAuthor.name,
    country: rawAuthor.country,
  });

  if (author) {
    return {
      error: {
        message: `there is an author with the name "${rawAuthor.name}" & country "${rawAuthor.country}"`,
      },
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

  const author = await findAuthorById(authorId);

  if (!author) {
    return {
      error: {
        message: `no author related to ID '${authorId}'`,
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
export const createABookWithAuthors = async (rawBook: CreateBookRequest) => {
  if (!rawBook?.authors?.length) {
    return { error: { message: `check authors data` } };
  }

  try {
    const newBook = await createBook(rawBook);
    if (newBook?.error?.message) {
      return { error: newBook?.error };
    }

    const booksAuthors = await createAuthorsBooks(
      newBook?.data?.dataValues?.id,
      rawBook?.authors
    );

    return booksAuthors;
  } catch (error) {
    console.trace("error createABookWithAuthors: ", error);
    throw new Error("createABookWithAuthors");
  }
};
