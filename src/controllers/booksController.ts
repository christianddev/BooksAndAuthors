import { Request, Response } from "express";
import httpStatus from "http-status";

import {
  createBook,
  createABookWithAuthors,
  findAllBooks,
  findOneBookById,
  findAllBooksAuthorsGroupByBook,
} from "../helpers/bookDatabase";
import { BookModel } from "../models";
import { BookRequest } from "../typings/book";

export const getBooks = async (req: Request, res: Response) => {
  try {
    // TODO: add pagination
    const books = await findAllBooks();

    return res.status(httpStatus.OK).json({ books });
  } catch (error) {
    console.trace(error);
    res.status(httpStatus?.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await findOneBookById(id);

    if (book) {
      return res.status(httpStatus.OK).json(book);
    }
    return res.status(httpStatus?.NOT_FOUND).json({
      msg: `book with id '${id}' not found`,
    });
  } catch (error) {
    console.trace(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};

export const getAllBooksAuthorsGroupByBook = async (
  req: Request,
  res: Response
) => {
  // TODO: add pagination
  const booksAuthors = await findAllBooksAuthorsGroupByBook();

  return res.status(httpStatus.OK).json({ booksAuthors });
};

export const postBook = async (req: Request, res: Response) => {
  try {
    const rawBook = req?.body as BookRequest;

    const newBook = await createBook(rawBook);
    // TODO: check this return, disable if middleware nos run for this request

    return res.status(httpStatus.OK).json(newBook);
  } catch (error) {
    console.trace(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};
export const postBookWithAuthors = async (req: Request, res: Response) => {
  const rawBook = req?.body as BookRequest;

  try {
    const newBook = await createABookWithAuthors(rawBook);
    // TODO: process object (is an array), error and success full operations
    // TODO: check this return, disable if middleware nos run for this request
    return res.status(httpStatus.OK).json(newBook);
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
    const book = await BookModel.findByPk(id);
    if (!book) {
      return res.status(httpStatus?.NOT_FOUND).json({
        msg: `book not found: ${id}`,
      });
    }

    await book.update(body);

    return res.status(httpStatus.OK).json(book);
  } catch (error) {
    console.trace(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
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
    const book = await BookModel.findByPk(id);
    if (!book) {
      return res.status(httpStatus?.NOT_FOUND).json({
        msg: `book not found: ${id}`,
      });
    }

    await book.update({ isDeleted: true });
    console.log("book", book);

    return res
      .status(httpStatus.OK)
      .json({ id: book?.toJSON()?.id, title: book?.toJSON()?.title });
  } catch (error) {
    console.trace(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};
