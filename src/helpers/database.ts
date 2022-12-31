import { Model } from "sequelize";
import { Author as AuthorModel, Book as BookModel } from "../models";
import type { ErrorOperation } from "../typings/api";
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

export const createBook = async (
  rawBook: CreateBook
): Promise<Model<any, any> | ErrorOperation> => {
  if (!rawBook?.title) {
    return { message: "check book data" };
  }

  const book = await findOneBookByTitle({ title: rawBook?.title });

  if (book) {
    return { message: `there is a book with the title '${rawBook?.title}'` };
  }
  const newBook = await BookModel.create({
    title: rawBook?.title,
  });

  return newBook;
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

const createAuthorsFromBook = async (rawAuthors: CreateAuthor[]) => {
  const newAuthors = [];
  for (let i = 0; i < rawAuthors.length; i++) {
    const newAuthor = await createAuthor(rawAuthors[i]);
    newAuthors.push(newAuthor);
  }
  return newAuthors;
};

export const createABookWithAuthors = async (rawBook: CreateBook) => {
  if (!rawBook?.authors?.length) {
    return { error: `check authors data` };
  }

  try {
    const newBook: Model<any, any> | ErrorOperation = await createBook(rawBook);
    console.log("### newBook", typeof newBook);
    // if (newBook.message) {
    // }
    const newAuthors = await createAuthorsFromBook(rawBook?.authors);
    console.log("### newAuthors", newAuthors);

    // TODO: return a single book or a book with his authors
    // TODO: if authors exists, return a message

    return newBook;
  } catch (error) {
    console.log("error", error);
    throw new Error("createABookWithAuthors");
  }
};
