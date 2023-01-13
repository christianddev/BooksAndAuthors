import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { findOneBookById, findOneBookByISBN } from "../services";
import { defaultErrorResponse } from "../utils";

import type { ErrorOperation } from "../typings/api";
import type { BookRequest } from "../typings/book";

export const validateBookByIdDataBase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req?.params?.id;
    const book = await findOneBookById(Number(id));

    if (!book) {
      const error: ErrorOperation = {
        status: httpStatus?.NOT_FOUND,
        message: `book with id '${id}' not found`,
      };
      return res.status(httpStatus?.NOT_FOUND).json({ error });
    }

    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const validateBookByISBNDataBase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rawBook: BookRequest = req?.body;
    const book = await findOneBookByISBN(rawBook?.isbn, false);

    if (book) {
      const error: ErrorOperation = {
        status: httpStatus?.BAD_REQUEST,
        message: `a book exists with the isbn '${rawBook?.isbn}', id '${book?.dataValues?.id}' & title '${book?.dataValues?.title}'`,
      };
      return res.status(httpStatus?.BAD_REQUEST).json({ error });
    }
    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};
