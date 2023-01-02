import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { findAuthorById, findOneAuthorByNameAndCountry } from "../helpers";
import type { AuthorRequest } from "../typings/author";

export const validateAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req?.params?.id;
    const author = await findAuthorById(id);

    if (!author) {
      return res.status(httpStatus?.NOT_FOUND).json({
        msg: `author with id '${id}' not found`,
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

export const validateAuthorByNameAndCountry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rawAuthor: AuthorRequest = req?.body;
    const author = await findOneAuthorByNameAndCountry({
      name: rawAuthor?.name,
      country: rawAuthor?.country,
    });

    if (author) {
      return res.status(httpStatus?.NOT_FOUND).json({
        msg: `a authors exists with the name '${rawAuthor?.name}' & country '${rawAuthor?.country}'`,
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
