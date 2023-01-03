import { AuthorModel, BookModel, BooksAuthorsModel } from "../models";
import type { OperationResponse } from "../typings/api";
import type { BookRequest } from "../typings/book";
import {
  createBooksAuthorsByBookId,
  deleteBooksAuthorsByBookId,
} from "./bookAuthorDatabase";
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
      ...(excludeTemporaryDeleted && { isDeleted: false }),
    },
    attributes: {
      exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
    },
  });

export const findOneBookById = async (
  id: number,
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
) =>
  await BookModel.findOne({
    where: {
      id,
      ...(excludeTemporaryDeleted && { isDeleted: false }),
    },
    attributes: {
      exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
    },
  });

export const findOneBookByISBN = async (
  isbn?: string,
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
) =>
  await BookModel.findOne({
    where: {
      isbn,
      ...(excludeTemporaryDeleted && { isDeleted: false }),
    },
    attributes: {
      exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
    },
  });

export const findAllBooksAuthorsGroupByBook = async (
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
) =>
  await BookModel?.findAll({
    where: {
      ...(excludeTemporaryDeleted && { isDeleted: false }),
    },
    attributes: {
      exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
    },
    include: [AuthorModel],
  });

const createBookFromModel = async ({ isbn, title }: BookRequest) =>
  await BookModel.create({
    isbn,
    title,
  });

export const createBook = async (
  rawBook: BookRequest
): Promise<OperationResponse<BookRequest>> => {
  const { dataValues }: { dataValues: BookRequest } = await createBookFromModel(
    {
      isbn: rawBook?.isbn,
      title: rawBook?.title,
    }
  );

  return {
    data: {
      id: dataValues?.id,
      isbn: dataValues?.isbn,
      title: dataValues?.title,
    },
  };
};

export const createBookWithAuthors = async ({
  isbn,
  title,
  authors,
}: BookRequest) => {
  try {
    const newBook = await createBookFromModel({ isbn, title });

    const booksAuthors = await createBooksAuthorsByBookId(
      newBook?.dataValues?.id,
      authors
    );

    return booksAuthors;
  } catch (error) {
    console.trace("error createABookWithAuthors: ", error);
    throw new Error("createABookWithAuthors");
  }
};

const updateBookFromModel = async ({
  id,
  isbn,
  title,
  isDeleted,
}: BookRequest) =>
  await BookModel.update(
    { isbn, title, isDeleted },
    {
      where: {
        id,
      },
    }
  );

export const updateBook = async ({ id, isbn, title }: BookRequest) => {
  const updatedBook = await updateBookFromModel({ id, isbn, title });

  return {
    data: { affectedRows: updatedBook },
  };
};

export const deleteBookTemporary = async (id: number, isDeleted: boolean) => {
  const deletedBooksAuthors = await deleteBooksAuthorsByBookId(id);

  const deletedBook = await updateBookFromModel({ id, isDeleted });

  return {
    data: { affectedRows: { deletedBooksAuthors, deletedBook } },
  };
};
