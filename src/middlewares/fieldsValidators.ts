import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  if (!req?.params?.id) {
    return res.status(httpStatus?.BAD_REQUEST).json({
      msg: "check 'id' field",
    });
  }
  next();
};

export const validateName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.body?.name) {
    return res.status(httpStatus?.BAD_REQUEST).json({
      msg: "check 'name' field",
    });
  }
  next();
};

export const validateCountry = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.body?.country) {
    return res.status(httpStatus?.BAD_REQUEST).json({
      msg: "check 'country' field",
    });
  }
  next();
};

export const validateNameAndCountryNotFalsy = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.body?.name && !req?.body?.country) {
    return res.status(httpStatus?.BAD_REQUEST).json({
      msg: "check 'name' & 'country' field",
    });
  }
  next();
};

export const validateISBN = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.body?.isbn) {
    return res.status(httpStatus?.BAD_REQUEST).json({
      msg: "check 'isbn' field",
    });
  }
  next();
};

export const validateTitle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.body?.title) {
    return res.status(httpStatus?.BAD_REQUEST).json({
      msg: "check 'title' field",
    });
  }
  next();
};

export const validateISBNAndTitleNotFalsy = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.body?.isbn && !req?.body?.title) {
    return res.status(httpStatus?.BAD_REQUEST).json({
      msg: "check 'isbn' & 'title' field",
    });
  }
  next();
};

export const validateAuthorIDs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.body?.authors) {
    return res.status(httpStatus?.BAD_REQUEST).json({
      msg: "check 'authors' field",
    });
  }
  next();
};

export const validateBookIDs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.body?.books) {
    return res.status(httpStatus?.BAD_REQUEST).json({
      msg: "check 'books' field",
    });
  }
  next();
};
