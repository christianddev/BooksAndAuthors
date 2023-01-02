import { Request, Response } from "express";
import httpStatus from "http-status";

import { createBook, createABookWithAuthors } from "../helpers/database";
import { Author as AuthorModel, Book } from "../models";
import { CreateBookRequest } from "../typings/book";

export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.findAll({
    attributes: {
      exclude: ["isDeleted", "createdAt", "updatedAt"],
    },
  });

  res.status(httpStatus.OK).json({ books });
};

export const getBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await Book.findByPk(id);

  if (book) {
    res.status(httpStatus.OK).json(book);
  } else {
    res.status(httpStatus?.NOT_FOUND).json({
      msg: `book not found: ${id}`,
    });
  }
};

export const getAllBooksAuthorsGroupByBook = async (
  req: Request,
  res: Response
) => {
  const booksAuthors = await Book.findAll({
    include: [AuthorModel],
  });

  res.status(httpStatus.OK).json({ booksAuthors });
};

export const postBook = async (req: Request, res: Response) => {
  const rawBook = req?.body as CreateBookRequest;

  if (!rawBook?.title) {
    res.status(400).json({
      msg: "check the book data",
    });
  }

  try {
    const newBook = await createBook(rawBook);
    // TODO: check this return, disable if middleware nos run for this request
    res.status(httpStatus.OK).json(newBook);
  } catch (error) {
    console.trace(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};
export const postBookWithAuthors = async (req: Request, res: Response) => {
  const rawBook = req?.body as CreateBookRequest;

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
      res.status(httpStatus.OK).json(newBook);
    }

    const newBook = await createBook(rawBook);
    // TODO: check this return, disable if middleware nos run for this request
    res.status(httpStatus.OK).json(newBook);
  } catch (error) {
    console.trace(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
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
      return res.status(httpStatus?.NOT_FOUND).json({
        msg: `book not found: ${id}`,
      });
    }

    await book.update(body);

    res.status(httpStatus.OK).json(book);
  } catch (error) {
    console.trace(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(httpStatus?.BAD_REQUEST).json({
        msg: "check book id",
      });
    }
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(httpStatus?.NOT_FOUND).json({
        msg: `book not found: ${id}`,
      });
    }

    await book.update({ isDeleted: true });
    console.log("book", book);

    res
      .status(httpStatus.OK)
      .json({ id: book?.toJSON()?.id, title: book?.toJSON()?.title });
  } catch (error) {
    console.trace(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};
