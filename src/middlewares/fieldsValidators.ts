import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import type { ErrorOperation } from "../typings/api";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  if (!req?.params?.id) {
    const error: ErrorOperation = {
      status: httpStatus?.NOT_FOUND,
      message: "check 'id' field",
    };
    return res.status(httpStatus?.BAD_REQUEST).json({ error });
  }
  next();
};

export const validateName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.body?.name) {
    const error: ErrorOperation = {
      status: httpStatus?.NOT_FOUND,
      message: "check 'name' field",
    };
    return res.status(httpStatus?.BAD_REQUEST).json({ error });
  }
  next();
};

export const validateCountry = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.body?.country) {
    const error: ErrorOperation = {
      status: httpStatus?.NOT_FOUND,
      message: "check 'country' field",
    };
    return res.status(httpStatus?.BAD_REQUEST).json({ error });
  }
  next();
};

export const validateNameAndCountryNotFalsy = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.body?.name && !req?.body?.country) {
    const error: ErrorOperation = {
      status: httpStatus?.NOT_FOUND,
      message: "check 'name' & 'country' field",
    };
    return res.status(httpStatus?.BAD_REQUEST).json({ error });
  }
  next();
};

export const validateISBN = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.body?.isbn) {
    const error: ErrorOperation = {
      status: httpStatus?.NOT_FOUND,
      message: "check 'isbn' field",
    };
    return res.status(httpStatus?.BAD_REQUEST).json({ error });
  }
  next();
};

export const validateTitle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.body?.title) {
    const error: ErrorOperation = {
      status: httpStatus?.NOT_FOUND,
      message: "check 'title' field",
    };
    return res.status(httpStatus?.BAD_REQUEST).json({ error });
  }
  next();
};

export const validateISBNAndTitleNotFalsy = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.body?.isbn && !req?.body?.title) {
    const error: ErrorOperation = {
      status: httpStatus?.NOT_FOUND,
      message: "check 'isbn' & 'title' field",
    };
    return res.status(httpStatus?.BAD_REQUEST).json({ error });
  }
  next();
};

export const validateAuthorIDs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.body?.authors) {
    const error: ErrorOperation = {
      status: httpStatus?.NOT_FOUND,
      message: "check 'authors' field",
    };
    return res.status(httpStatus?.BAD_REQUEST).json({ error });
  }
  next();
};

export const validateBookIDs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.body?.books) {
    const error: ErrorOperation = {
      status: httpStatus?.NOT_FOUND,
      message: "check 'books' field",
    };
    return res.status(httpStatus?.BAD_REQUEST).json({ error });
  }
  next();
};
