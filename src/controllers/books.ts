import { Request, Response } from "express";
import {
  createABook,
  createABookWithAuthors,
  findOneBookByTitle,
} from "../helpers/database";
import { Book } from "../models";
import { CreateBook } from "../typings/book";

export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.findAll();

  res.json({ books });
};

export const getBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  const book = await Book.findByPk(id);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({
      msg: `book not found: ${id}`,
    });
  }
};

export const postBook = async (req: Request, res: Response) => {
  const rawBook = req?.body as CreateBook;

  if (!rawBook?.title) {
    res.status(400).json({
      msg: "check the book data",
    });
  }

  try {
    const book = await findOneBookByTitle({ title: rawBook?.title });

    if (book) {
      return res.status(400).json({
        msg: `a books exists with the title ${rawBook?.title}`,
      });
    }

    if (rawBook?.authors?.length) {
      return await createABookWithAuthors(rawBook, res);
    }

    return await createABook(rawBook, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "contact with the administrator",
    });
  }
};

export const putBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        msg: `book not found: ${id}`,
      });
    }

    await book.update(body);

    res.json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "contact with the administrator",
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  const book = await Book.findByPk(id);
  if (!book) {
    return res.status(404).json({
      msg: `book not found: ${id}`,
    });
  }

  await book.update({ isDeleted: true });

  // await book.destroy();

  res.json(book);
};
