import { Request, Response } from "express";
import httpStatus from "http-status";

import {
  createBook,
  createBookWithAuthors,
  findAllBooks,
  findOneBookById,
  findAllBooksAuthorsGroupByBook,
  updateBook,
  removeBook,
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
    return defaultErrorResponse(err, res);
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
    return defaultErrorResponse(err, res);
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
    return defaultErrorResponse(err, res);
  }
};

export const postBook = async (req: Request, res: Response) => {
  try {
    const rawBook = req?.body as BookRequest;

    const newBook = await createBook(rawBook);

    return res
      .status(httpStatus.CREATED)
      .json({ data: { book: newBook?.data } });
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const postBookWithAuthors = async (req: Request, res: Response) => {
  const rawBook = req?.body as BookRequest;

  try {
    const newBook = await createBookWithAuthors(rawBook);

    return res.status(httpStatus.CREATED).json({ data: newBook });
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const patchBook = async (req: Request, res: Response) => {
  try {
    const {
      body: { isbn, title },
      params: { id },
    } = req;

    const response = await updateBook({ id: Number(id), isbn, title });

    return res.status(httpStatus.OK).json(response);
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const patchBookWithAuthors = async (req: Request, res: Response) => {
  try {
    const {
      body: { authors },
      params: { id },
    } = req;

    const response = await setBooksAuthorsFromBookId(Number(id), authors);
    if (response?.data?.length) {
      return res.status(httpStatus.OK).json(response);
    }

    const error: ErrorOperation = {
      status: httpStatus?.BAD_REQUEST,
      errors: response?.error,
    };

    return res.status(httpStatus?.BAD_REQUEST).json({ error });
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const response = await removeBook(Number(req?.params?.id));

    return res.status(httpStatus.OK).json(response);
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};
