import { Response } from "express";
import httpStatus from "http-status";

import type { ErrorOperation } from "../typings/api";

export * from "../utils/constants";

export const defaultErrorResponse = (error: unknown, res: Response) => {
  console.trace(error);

  const customError: ErrorOperation = {
    status: httpStatus?.INTERNAL_SERVER_ERROR,
    message: "contact with the administrator",
  };

  res.status(httpStatus?.INTERNAL_SERVER_ERROR).json({ error: customError });
};

export const throwError = (message: string, error: unknown) => {
  console.trace(`${message}: `, error);
  throw new Error(message);
};
