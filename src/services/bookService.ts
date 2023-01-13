import { AuthorModel, BookModel } from "../models";
import { throwError } from "../utils";

import {
  createBooksAuthorsByBookId,
  destroyBooksAuthorsByBookId,
} from "./bookAuthorService";
import {
  EXCLUDE_ORM_FIELDS,
  EXCLUDE_TEMPORARY_DELETED,
  SEQUELIZE_FIELDS,
  TEMPORARY_DELETE,
} from "../utils/";

import type { OperationResponse } from "../typings/api";
import type { BookRequest } from "../typings/book";

export const findAllBooks = async (
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS,
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED
) => {
  try {
    const books = await BookModel.findAll({
      where: {
        ...(excludeTemporaryDeleted && { isDeleted: false }),
      },
      attributes: {
        exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
      },
    });

    return books;
  } catch (error) {
    return throwError("findAllBooks", error);
  }
};

export const findOneBookById = async (
  id: number,
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
) => {
  try {
    const book = await BookModel.findOne({
      where: {
        id,
        ...(excludeTemporaryDeleted && { isDeleted: false }),
      },
      attributes: {
        exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
      },
    });

    return book;
  } catch (error) {
    return throwError("findOneBookById", error);
  }
};

export const findOneBookByISBN = async (
  isbn?: string,
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
) => {
  try {
    const book = await BookModel.findOne({
      where: {
        isbn,
        ...(excludeTemporaryDeleted && { isDeleted: false }),
      },
      attributes: {
        exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
      },
    });

    return book;
  } catch (error) {
    return throwError("findOneBookByISBN", error);
  }
};

export const findAllBooksAuthorsGroupByBook = async (
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
) => {
  try {
    const book = await BookModel?.findAll({
      where: {
        ...(excludeTemporaryDeleted && { isDeleted: false }),
      },
      attributes: {
        exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
      },
      include: [
        {
          model: AuthorModel,
          attributes: {
            exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
          },
          through: {
            attributes: {
              exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
            },
          },
        },
      ],
    });

    return book;
  } catch (error) {
    return throwError("findAllBooksAuthorsGroupByBook", error);
  }
};

const createBookFromModel = async ({ isbn, title }: BookRequest) => {
  try {
    const book = await BookModel.create({
      isbn,
      title,
    });

    return book;
  } catch (error) {
    return throwError("createBookFromModel", error);
  }
};

export const createBook = async (
  rawBook: BookRequest
): Promise<OperationResponse<BookRequest>> => {
  try {
    const {
      dataValues: { id, isbn, title },
    }: { dataValues: BookRequest } = await createBookFromModel({
      isbn: rawBook?.isbn,
      title: rawBook?.title,
    });

    return {
      data: {
        id,
        isbn,
        title,
      },
    };
  } catch (error) {
    return throwError("createBook", error);
  }
};

export const createBookWithAuthors = async ({
  isbn,
  title,
  authors,
}: BookRequest) => {
  try {
    const { dataValues } = await createBookFromModel({ isbn, title });

    const booksAuthors = await createBooksAuthorsByBookId(
      dataValues?.id,
      authors
    );

    return {
      book: {
        id: dataValues?.id,
        isbn: dataValues?.isbn,
        title: dataValues?.title,
        ...(!EXCLUDE_ORM_FIELDS && {
          createdAt: dataValues?.createdAt,
          updatedAt: dataValues?.updatedAt,
          isDeleted: dataValues?.isDeleted,
        }),
      },
      booksAuthors,
    };
  } catch (error) {
    return throwError("createBookWithAuthors", error);
  }
};

const updateBookFromModel = async ({
  id,
  isbn,
  title,
  isDeleted,
}: BookRequest) => {
  try {
    const response = await BookModel.update(
      { isbn, title, isDeleted },
      {
        where: {
          id,
        },
      }
    );

    return response;
  } catch (error) {
    return throwError("updateBookFromModel", error);
  }
};

export const updateBook = async ({ id, isbn, title }: BookRequest) => {
  try {
    const updatedBook = await updateBookFromModel({ id, isbn, title });

    return {
      data: { affectedRows: updatedBook },
    };
  } catch (error) {
    return throwError("updateBook", error);
  }
};

const destroyBookFromModel = async (id: number) => {
  try {
    const response = await BookModel.destroy({
      where: {
        id,
      },
    });
    return response;
  } catch (error) {
    return throwError("destroyBookFromModel", error);
  }
};

export const removeBook = async (id: number) => {
  try {
    const deletedBooksAuthors = await destroyBooksAuthorsByBookId(id);

    if (TEMPORARY_DELETE) {
      const deletedBook = await updateBookFromModel({ id, isDeleted: true });

      return {
        data: { affectedRows: { deletedBooksAuthors, deletedBook } },
      };
    }

    const deletedBook = await destroyBookFromModel(id);

    return {
      data: { affectedRows: { deletedBooksAuthors, deletedBook } },
    };
  } catch (error) {
    return throwError("deleteBookTemporary", error);
  }
};
