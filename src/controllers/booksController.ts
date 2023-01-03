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
    const book = await findOneBookById(Number(id));

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
    const newBook = await createBookWithAuthors(rawBook);

    return res.status(httpStatus.OK).json(newBook);
  } catch (error) {
    console.trace(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};

export const putBookWithAuthors = async (req: Request, res: Response) => {
  try {
    const {
      body: { authors },
      params: { id },
    } = req;

    const newBook = await setBooksAuthorsFromBookId(Number(id), authors);

    return res.status(httpStatus.OK).json(newBook);
  } catch (error) {
    console.trace(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
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
  } catch (error) {
    console.trace(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;

    const response = await deleteBookTemporary(Number(id), true);
    return res.status(httpStatus.OK).json(response);
  } catch (error) {
    console.trace(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};
