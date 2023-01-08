import { AuthorModel, BookModel } from "../models";
import { setError } from "../utils";

import {
  createBooksAuthorsByAuthorId,
  destroyBooksAuthorsByAuthorId,
} from "./bookAuthorDatabase";
import {
  EXCLUDE_ORM_FIELDS,
  EXCLUDE_TEMPORARY_DELETED,
  SEQUELIZE_FIELDS,
  TEMPORARY_DELETE,
} from "./constants";

import type { AuthorRequest } from "../typings/author";

export const findAllAuthors = async (
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
) => {
  try {
    const authors = await AuthorModel?.findAll({
      where: {
        ...(excludeTemporaryDeleted && { isDeleted: false }),
      },
      attributes: {
        exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
      },
    });

    return authors;
  } catch (error) {
    return setError("findAllAuthors", error);
  }
};

export const finOneAuthorById = async (
  id: number,
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
) => {
  try {
    const author = await AuthorModel.findOne({
      where: {
        id,
        ...(excludeTemporaryDeleted && { isDeleted: false }),
      },
      attributes: {
        exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
      },
    });

    return author;
  } catch (error) {
    return setError("finOneAuthorById", error);
  }
};

export const findOneAuthorByNameAndCountry = async (
  { name = "", country = "" }: AuthorRequest,
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
) => {
  try {
    const author = await AuthorModel.findOne({
      where: {
        name,
        country,
        ...(excludeTemporaryDeleted && { isDeleted: false }),
      },
      attributes: {
        exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
      },
    });

    return author;
  } catch (error) {
    return setError("findOneAuthorByNameAndCountry", error);
  }
};

export const findAllBooksAuthorsGroupByAuthor = async (
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
) => {
  try {
    const authors = await AuthorModel?.findAll({
      where: {
        ...(excludeTemporaryDeleted && { isDeleted: false }),
      },
      attributes: {
        exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
      },
      include: [
        {
          model: BookModel,
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

    return authors;
  } catch (error) {
    return setError("findAllBooksAuthorsGroupByAuthor", error);
  }
};

const createBookFromModel = async ({ name, country }: AuthorRequest) => {
  try {
    const author = await AuthorModel.create({
      name,
      country,
    });

    return author;
  } catch (error) {
    return setError("createBookFromModel", error);
  }
};

export const createAuthor = async (rawAuthor: AuthorRequest) => {
  try {
    const {
      dataValues: { id, name, country },
    }: { dataValues: AuthorRequest } = await createBookFromModel({
      name: rawAuthor?.name,
      country: rawAuthor?.country,
    });

    return {
      data: { id, name, country },
    };
  } catch (error) {
    return setError("createAuthor", error);
  }
};

export const createAuthorWithBooks = async ({
  name,
  country,
  books,
}: AuthorRequest) => {
  try {
    const { dataValues } = await createBookFromModel({
      name,
      country,
    });

    const booksAuthors = await createBooksAuthorsByAuthorId(
      dataValues?.id,
      books ?? []
    );

    return {
      author: {
        id: dataValues?.id,
        name: dataValues?.name,
        country: dataValues?.country,
      },
      booksAuthors,
    };
  } catch (error) {
    return setError("createAuthorWithBooks", error);
  }
};

export const setBooksAuthorsFromAuthorId = async (
  id: number,
  books: number[]
) => {
  try {
    const booksAuthors = await createBooksAuthorsByAuthorId(id, books);

    return {
      data: { booksAuthors: booksAuthors?.data },
      error: booksAuthors?.error,
    };
  } catch (error) {
    return setError("setBooksAuthorsFromAuthorId", error);
  }
};

const updateAuthorFromModel = async ({
  id,
  name,
  country,
  isDeleted,
}: AuthorRequest) => {
  try {
    const response = await AuthorModel.update(
      {
        name,
        country,
        isDeleted,
      },
      {
        where: {
          id,
        },
      }
    );

    return response;
  } catch (error) {
    return setError("updateAuthorFromModel", error);
  }
};

export const updateAuthor = async ({ id, name, country }: AuthorRequest) => {
  try {
    const updatedAuthor = await updateAuthorFromModel({ id, name, country });

    return {
      data: { affectedRows: updatedAuthor },
    };
  } catch (error) {
    return setError("updateAuthor", error);
  }
};

const destroyAuthorFromModel = async (id: number) => {
  try {
    const response = await AuthorModel.destroy({
      where: {
        id,
      },
    });

    return response;
  } catch (error) {
    return setError("destroyAuthorFromModel", error);
  }
};

export const removeAuthor = async (id: number) => {
  try {
    const deletedBooksAuthors = await destroyBooksAuthorsByAuthorId(id);

    if (TEMPORARY_DELETE) {
      const deletedAuthor = await updateAuthorFromModel({
        id,
        isDeleted: true,
      });

      return {
        data: { affectedRows: { deletedBooksAuthors, deletedAuthor } },
      };
    }

    const deletedBook = await destroyAuthorFromModel(id);

    return {
      data: { affectedRows: { deletedBooksAuthors, deletedBook } },
    };
  } catch (error) {
    return setError("deleteAuthorTemporary", error);
  }
};
