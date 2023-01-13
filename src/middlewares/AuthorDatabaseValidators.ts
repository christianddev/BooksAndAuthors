import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { finOneAuthorById, findOneAuthorByNameAndCountry } from "../services";
import { defaultErrorResponse } from "../utils";

import type { ErrorOperation } from "../typings/api";
import type { AuthorRequest } from "../typings/author";

export const validateAuthorByIdDataBase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req?.params?.id;
    const author = await finOneAuthorById(Number(id));

    if (!author) {
      const error: ErrorOperation = {
        status: httpStatus?.NOT_FOUND,
        message: `author with id '${id}' not found`,
      };
      return res.status(httpStatus?.NOT_FOUND).json({ error });
    }

    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};

export const validateAuthorByNameAndCountryDataBase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rawAuthor: AuthorRequest = req?.body;
    const author = await findOneAuthorByNameAndCountry(
      {
        name: rawAuthor?.name,
        country: rawAuthor?.country,
      },
      false
    );

    if (author) {
      const error: ErrorOperation = {
        status: httpStatus?.BAD_REQUEST,
        message: `a authors exists with the name '${rawAuthor?.name}' & country '${rawAuthor?.country}'`,
      };
      return res.status(httpStatus?.BAD_REQUEST).json({ error });
    }
    next();
  } catch (err) {
    return defaultErrorResponse(err, res);
  }
};
