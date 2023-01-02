import { AuthorModel, BookModel } from "../models";
import type { AuthorRequest } from "../typings/author";
import { SEQUELIZE_FIELDS } from "./constants";

const defaultValueExcludeORMFields = Boolean(
  process.env.EXCLUDE_ORM_FIELDS as string
);

console.log("defaultValueExcludeORMFields", defaultValueExcludeORMFields);
const defaultValueExcludeTemporaryDeleted = Boolean(
  process.env.EXCLUDE_ORM_FIELDS as string
);

export const findAllAuthors = async (
  excludeORMFields: boolean = defaultValueExcludeORMFields
) =>
  await AuthorModel?.findAll({
    attributes: {
      exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
    },
  });

export const findAuthorById = async (
  id: string,
  excludeTemporaryDeleted: boolean = false,
  excludeORMFields: boolean = true
) =>
  await AuthorModel.findOne({
    where: {
      id,
      isDeleted: excludeTemporaryDeleted,
    },
    attributes: {
      exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
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

export const findAllBooksAuthorsGroupByAuthor = async (
  excludeORMFields: boolean = true
) =>
  await AuthorModel?.findAll({
    attributes: {
      exclude: excludeORMFields ? SEQUELIZE_FIELDS : [""],
    },
    include: [BookModel],
  });

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

export const updateAuthor = async (rawAuthor: AuthorRequest) => {
  const updatedAuthor = await AuthorModel.update(
    {
      name: rawAuthor?.name,
      country: rawAuthor?.country,
    },
    {
      where: {
        id: rawAuthor?.id,
      },
    }
  );

  return {
    data: { affectedRows: updatedAuthor },
  };
};

export const deleteAuthorTemporary = async (id: number, isDeleted: boolean) => {
  const updatedAuthor = await AuthorModel.update(
    { isDeleted },
    {
      where: {
        id,
      },
    }
  );

  return {
    data: { affectedRows: updatedAuthor },
  };
};
