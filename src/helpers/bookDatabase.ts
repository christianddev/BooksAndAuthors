import { BookModel } from "../models";
import type { OperationResponse } from "../typings/api";
import type { BookRequest } from "../typings/book";
import { createAuthorsBooks } from "./bookAuthorDatabase";
import {
  EXCLUDE_ORM_FIELDS,
  EXCLUDE_TEMPORARY_DELETED,
  SEQUELIZE_FIELDS,
} from "./constants";


export const findAllBooks = async (
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS,
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED
) =>
  await BookModel.findAll({
    where: {
      isDeleted: excludeTemporaryDeleted,
    },
    attributes: {
      exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
    },
  });

export const findBookById = async (
  id: string,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
) =>
  await BookModel.findByPk(id, {
    attributes: {
      exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
    },
  });

export const findOneBookByISBN = async (
  isbn: string,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
) =>
  await BookModel.findOne({
    where: {
      isbn,
    },
    attributes: {
      exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
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
