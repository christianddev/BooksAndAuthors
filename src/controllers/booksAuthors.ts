import { Request, Response } from "express";
import { Author, Book } from "../models";

export const getAllBooksAuthorsGroupByBook = async (
  req: Request,
  res: Response
) => {
  const booksAuthors = await Book.findAll({
    include: [Author],
  });

  res.json({ booksAuthors });
};

export const getAllBooksAuthorsGroupByAuthor = async (
  req: Request,
  res: Response
) => {
  const booksAuthors = await Author.findAll({
    include: [Book],
  });

  res.json({ booksAuthors });
};
