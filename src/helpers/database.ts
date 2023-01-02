import { AuthorModel, BookModel, BooksAuthorsModel } from "../models";
import type { OperationResponse } from "../typings/api";
import type { AuthorRequest } from "../typings/author";
import type { BookRequest } from "../typings/book";

const SEQUELIZE_FIELDS = ["isDeleted", "createdAt", "updatedAt"];

export const findAllAuthorsMin = async () =>
  await AuthorModel?.findAll({
    attributes: {
      exclude: SEQUELIZE_FIELDS,
    },
  });

export const findAllBooksMin = async () =>
  await BookModel.findAll({
    attributes: {
      exclude: SEQUELIZE_FIELDS,
    },
  });

export const findBookById = async (id: string) =>
  await BookModel.findByPk(id, {
    attributes: {
      exclude: SEQUELIZE_FIELDS,
    },
  });

export const findOneBookByISBN = async (isbn: string) =>
  await BookModel.findOne({
    where: {
      isbn,
    },
    attributes: {
      exclude: SEQUELIZE_FIELDS,
    },
  });

export const findAuthorById = async (id: string) =>
  await AuthorModel.findByPk(id, {
    attributes: {
      exclude: SEQUELIZE_FIELDS,
    },
  });

export const findOneAuthorByNameAndCountry = async ({
  name = "",
  country = "",
}: AuthorRequest) =>
  await AuthorModel.findOne({
    where: {
      name,
      country,
    },
  });

export const findBooksAuthorsByBookId = async (bookId: string) =>
  await BooksAuthorsModel.findAll({
    where: {
      bookId,
    },
  });

export const createBook = async (
  rawBook: BookRequest
): Promise<OperationResponse<BookRequest>> => {
  const { dataValues }: { dataValues: BookRequest } = await BookModel.create({
    isbn: rawBook?.isbn,
    title: rawBook?.title,
  });

  return {
    data: {
      id: dataValues?.id,
      isbn: dataValues?.isbn,
      title: dataValues?.title,
    },
  };
};

export const createAuthor = async (rawAuthor: AuthorRequest) => {
  const {
    dataValues: { id, name, country },
  }: { dataValues: AuthorRequest } = await AuthorModel.create({
    name: rawAuthor?.name,
    country: rawAuthor?.country,
  });

  return {
    data: { id, name, country },
  };
};

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

const createAuthorsBooks = async (
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

// TODO: check response
export const createABookWithAuthors = async (rawBook: BookRequest) => {
  if (!rawBook?.authors?.length) {
    return { error: { message: `check authors data` } };
  }

  try {
    const newBook = await createBook(rawBook);
    if (newBook?.error?.message) {
      return { error: newBook?.error };
    }

    const booksAuthors = await createAuthorsBooks(
      newBook?.data?.id,
      rawBook?.authors
    );

    return booksAuthors;
  } catch (error) {
    console.trace("error createABookWithAuthors: ", error);
    throw new Error("createABookWithAuthors");
  }
};
