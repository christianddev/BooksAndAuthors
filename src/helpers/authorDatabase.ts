import { AuthorModel, BookModel } from "../models";
import type { AuthorRequest } from "../typings/author";
import {
  createBooksAuthorsByAuthor,
  deleteBooksAuthorsByAuthorId,
} from "./bookAuthorDatabase";
import {
  EXCLUDE_ORM_FIELDS,
  EXCLUDE_TEMPORARY_DELETED,
  SEQUELIZE_FIELDS,
} from "./constants";

export const findAllAuthors = async (
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
) =>
  await AuthorModel?.findAll({
    where: {
      ...(excludeTemporaryDeleted && { isDeleted: false }),
    },
    attributes: {
      exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
    },
  });

export const finOneAuthorById = async (
  id: string,
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
) =>
  await AuthorModel.findOne({
    where: {
      id,
      ...(excludeTemporaryDeleted && { isDeleted: false }),
    },
    attributes: {
      exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
    },
  });

export const findOneAuthorByNameAndCountry = async (
  { name = "", country = "" }: AuthorRequest,
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
) =>
  await AuthorModel.findOne({
    where: {
      name,
      country,
      ...(excludeTemporaryDeleted && { isDeleted: false }),
    },
    attributes: {
      exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
    },
  });

export const findAllBooksAuthorsGroupByAuthor = async (
  excludeTemporaryDeleted: boolean = EXCLUDE_TEMPORARY_DELETED,
  excludeORMFields: boolean = EXCLUDE_ORM_FIELDS
) =>
  await AuthorModel?.findAll({
    where: {
      ...(excludeTemporaryDeleted && { isDeleted: false }),
    },
    attributes: {
      exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
    },
    include: [BookModel],
  });

const createBookFromModel = async ({ name, country }: AuthorRequest) =>
  await AuthorModel.create({
    name,
    country,
  });

export const createAuthor = async (rawAuthor: AuthorRequest) => {
  const {
    dataValues: { id, name, country },
  }: { dataValues: AuthorRequest } = await createBookFromModel({
    name: rawAuthor?.name,
    country: rawAuthor?.country,
  });

  return {
    data: { id, name, country },
  };
};

// TODO: check response  and catch
export const createAuthorWithBooks = async (rawAuthor: AuthorRequest) => {
  try {
    const newAuthor = await createBookFromModel({
      name: rawAuthor?.name,
      country: rawAuthor?.country,
    });

    const booksAuthors = await createBooksAuthorsByAuthor(
      newAuthor?.dataValues?.id,
      rawAuthor?.books ?? [""]
    );

    // TODO: process object (is an array), error and success full operations
    // TODO: check this return, disable if middleware nos run for this request
    return booksAuthors;
  } catch (error) {
    console.trace("error createABookWithAuthors: ", error);
    throw new Error("createABookWithAuthors");
  }
};

const updateAuthorFromModel = async ({
  id,
  name,
  country,
  isDeleted,
}: AuthorRequest) =>
  await AuthorModel.update(
    {
      name,
      country,
      isDeleted
    },
    {
      where: {
        id,
      },
    }
  );

export const updateAuthor = async ({ id, name, country }: AuthorRequest) => {
  const updatedAuthor = await updateAuthorFromModel({ id, name, country });

  return {
    data: { affectedRows: updatedAuthor },
  };
};

export const deleteAuthorTemporary = async (id: number, isDeleted: boolean) => {
  const deletedBooksAuthors = await deleteBooksAuthorsByAuthorId(id);

  const deletedBook = await updateAuthorFromModel({ id, isDeleted });

  return {
    data: { affectedRows: { deletedBooksAuthors, deletedBook } },
  };
};
