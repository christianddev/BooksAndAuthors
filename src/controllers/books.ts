import { Request, Response } from "express";
import { createBook, createABookWithAuthors } from "../helpers/database";
import { Author, Book } from "../models";
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

export const getAllBooksAuthorsGroupByBook = async (
  req: Request,
  res: Response
) => {
  const booksAuthors = await Book.findAll({
    include: [Author],
  });

  res.json({ booksAuthors });
};

export const postBook = async (req: Request, res: Response) => {
  const rawBook = req?.body as CreateBook;

  if (!rawBook?.title) {
    res.status(400).json({
      msg: "check the book data",
    });
  }

  try {
    const newBook = await createBook(rawBook);
    // TODO: check this return, disable if middleware nos run for this request
    return res.json(newBook);
  } catch (error) {
    console.trace(error);
    return res.status(500).json({
      msg: "contact with the administrator",
    });
  }
};
export const postBookWithAuthors = async (req: Request, res: Response) => {
  const rawBook = req?.body as CreateBook;

  if (!rawBook?.title) {
    res.status(400).json({
      msg: "check the book data",
    });
  }

  if (!rawBook?.authors?.length) {
    return { error: { message: `check authors data` } };
  }

  try {
    if (rawBook?.authors?.length) {
      const newBook = await createABookWithAuthors(rawBook);
      // TODO: error by code
      // TODO: check this return, disable if middleware nos run for this request
      return res.json(newBook);
    }

    const newBook = await createBook(rawBook);
    // TODO: check this return, disable if middleware nos run for this request
    return res.json(newBook);
  } catch (error) {
    console.trace(error);
    return res.status(500).json({
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
