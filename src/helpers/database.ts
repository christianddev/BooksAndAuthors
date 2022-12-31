import { Model } from "sequelize";
import { Author as AuthorModel, Book as BookModel } from "../models";
import type { ResponseOperation } from "../typings/api";
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
): Promise<ResponseOperation> => {
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

const createAuthorsFromBook = async (rawAuthors: CreateAuthor[]) =>
  new Promise(async (resolve, reject) => {

    try {
      const newAuthors = [];
      for (let i = 0; i < rawAuthors.length; i++) {
        const newAuthor = await createAuthor(rawAuthors[i]);
        newAuthors.push(newAuthor);
      }
      resolve(newAuthors);
    } catch (error) {
      console.trace("createAuthorsFromBook: ", error);
      reject(error);
    }
  });

export const createABookWithAuthors = async (
  rawBook: CreateBook
): Promise<ResponseOperation> => {

  if (!rawBook?.authors?.length) {
    return { error: { message: `check authors data` } };
  }

  try {
    const newBook = await createBook(rawBook);
    if (newBook?.error?.message) {
      return { error: { message: newBook?.error?.message } };
    }

    const newAuthors = await createAuthorsFromBook(rawBook?.authors);
    console.log("### newAuthors", newAuthors);

    // TODO: return a single book or a book with his authors
    // TODO: if authors exists, return a message

    return newBook;
  } catch (error) {
    console.log("error createABookWithAuthors: ", error);
    throw new Error("createABookWithAuthors");
  }
};
