import { Response } from "express";

import { Author as AuthorModel, Book as BookModel } from "../models";
import type { Author } from "../typings/author";
import type { CreateBook } from "../typings/book";

export const findOneBookByTitle = async ({ title = "" }: { title: string }) =>
  await BookModel.findOne({
    where: {
      title,
    },
  });

export const findOneAuthorByTitle = async ({
  name = "",
  country = "",
}: Author) =>
  await AuthorModel.findOne({
    where: {
      name,
      country,
    },
  });

export const createABook = async (
  rawBook: CreateBook,
  res: Response<any, Record<string, any>>
) => {
  const newBook = await BookModel.create({
    title: rawBook?.title,
  });

  return res.json(newBook);
};

export const createABookWithAuthors = async (
  rawBook: CreateBook,
  res: Response<any, Record<string, any>>
) => {
  if (!rawBook?.authors?.length) {
    return null;
  }

  const newBook = await BookModel.create(
    {
      title: rawBook?.title,
      authors: [
        {
          name: rawBook?.authors[0]?.name,
          country: rawBook?.authors[0]?.country
        },
      ],
    },
    {
      include: AuthorModel,
    }
  );

  return res.json(newBook);
};
