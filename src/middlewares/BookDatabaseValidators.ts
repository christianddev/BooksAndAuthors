import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { findOneBookById, findOneBookByISBN } from "../helpers";
import { BookRequest } from "../typings/book";

export const validateBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req?.params?.id;
    const book = await findOneBookById(id);

    if (!book) {
      return res.status(httpStatus?.NOT_FOUND).json({
        msg: `book with id '${id}' not found`,
      });
    }

    next();
  } catch (error) {
    console.trace(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};

export const validateBookByISBN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rawBook: BookRequest = req?.body;
    const book = await findOneBookByISBN(rawBook?.isbn);

    if (book) {
      return res.status(httpStatus?.NOT_FOUND).json({
        msg: `a book exists with the isbn '${rawBook?.isbn}', id '${book?.dataValues?.id}' & title '${book?.dataValues?.title}'`,
      });
    }
    next();
  } catch (error) {
    console.trace(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};
