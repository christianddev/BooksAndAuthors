import { Request, Response } from "express";
import httpStatus from "http-status";

import {
  createBook,
  createABookWithAuthors,
  findAllBooks,
  findBookById,
  findOneBookByISBN,
} from "../helpers/bookDatabase";
import { AuthorModel, BookModel } from "../models";
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

    if (!id) {
      return res.status(httpStatus?.BAD_REQUEST).json({
        msg: "check book id",
      });
    }

    const book = await findBookById(id);

    if (book) {
      return res.status(httpStatus.OK).json(book);
    }
    return res.status(httpStatus?.NOT_FOUND).json({
      msg: `book not found: ${id}`,
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
  const booksAuthors = await BookModel.findAll({
    include: [AuthorModel],
  });

  return res.status(httpStatus.OK).json({ booksAuthors });
};

export const postBook = async (req: Request, res: Response) => {
  try {
    const rawBook = req?.body as BookRequest;

    // add to middleware

    if (!rawBook?.isbn || !rawBook?.title) {
      return res.status(httpStatus.BAD_REQUEST).json({
        msg: `check the book isbn '${rawBook?.isbn}' & title '${rawBook?.title}'`,
      });
    }

    // add to middleware
    const book = await findOneBookByISBN(rawBook?.isbn);

    if (book) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: {
          message: `there is a book with the isbn '${book?.dataValues?.isbn}', id '${book?.dataValues?.id}' & title '${book?.dataValues?.title}'`,
        },
      });
    }

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

  if (!rawBook?.title) {
    res.status(httpStatus.BAD_REQUEST).json({
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
      return res.status(httpStatus.OK).json(newBook);
    }

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
