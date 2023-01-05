import { Request, Response } from "express";
import httpStatus from "http-status";

import {
  createBook,
  createBookWithAuthors,
  findAllBooks,
  findOneBookById,
  findAllBooksAuthorsGroupByBook,
  updateBook,
  deleteBookTemporary,
  setBooksAuthorsFromBookId,
} from "../helpers/";
import { defaultErrorResponse } from "../utils";

import type { ErrorOperation } from "../typings/api";
import type { BookRequest } from "../typings/book";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await findAllBooks();

    return res.status(httpStatus.OK).json({ data: { books } });
  } catch (err) {
    console.trace(err);

    return defaultErrorResponse(res);
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await findOneBookById(Number(id));

    if (book) {
      return res.status(httpStatus.OK).json({ data: { book } });
    }

    const error: ErrorOperation = {
      status: httpStatus?.NOT_FOUND,
      message: `book with id '${id}' not found`,
    };

    return res.status(httpStatus?.NOT_FOUND).json({ error });
  } catch (err) {
    console.trace(err);

    return defaultErrorResponse(res);
  }
};

export const getAllBooksAuthorsGroupByBook = async (
  req: Request,
  res: Response
) => {
  try {
    const booksAuthors = await findAllBooksAuthorsGroupByBook();

    return res.status(httpStatus.OK).json({ data: { booksAuthors } });
  } catch (err) {
    console.trace(err);

    return defaultErrorResponse(res);
  }
};

export const postBook = async (req: Request, res: Response) => {
  try {
    const rawBook = req?.body as BookRequest;

    const newBook = await createBook(rawBook);

    return res.status(httpStatus.OK).json({ data: { book: newBook } });
  } catch (err) {
    console.trace(err);

    return defaultErrorResponse(res);
  }
};
export const postBookWithAuthors = async (req: Request, res: Response) => {
  const rawBook = req?.body as BookRequest;

  try {
    const newBook = await createBookWithAuthors(rawBook);

    // TODO: is data is empty , return error code
    return res.status(httpStatus.OK).json(newBook);
  } catch (err) {
    console.trace(err);

    return defaultErrorResponse(res);
  }
};

export const putBookWithAuthors = async (req: Request, res: Response) => {
  try {
    const {
      body: { authors },
      params: { id },
    } = req;

    // TODO: is data is empty , return error code
    const newBook = await setBooksAuthorsFromBookId(Number(id), authors);

    return res.status(httpStatus.OK).json(newBook);
  } catch (err) {
    console.trace(err);

    return defaultErrorResponse(res);
  }
};

export const putBook = async (req: Request, res: Response) => {
  try {
    const {
      body: { isbn, title },
      params: { id },
    } = req;

    const response = await updateBook({ id: Number(id), isbn, title });
    return res.status(httpStatus.OK).json(response);
  } catch (err) {
    console.trace(err);

    return defaultErrorResponse(res);
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;

    const response = await deleteBookTemporary(Number(id), true);
    return res.status(httpStatus.OK).json(response);
  } catch (err) {
    console.trace(err);

    return defaultErrorResponse(res);
  }
};
