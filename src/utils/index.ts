import { Response } from "express";
import httpStatus from "http-status";

import type { ErrorOperation } from "../typings/api";

export const defaultErrorResponse = (res: Response) => {
  const error: ErrorOperation = {
    status: httpStatus?.INTERNAL_SERVER_ERROR,
    message: "contact with the administrator",
  };

  res.status(httpStatus?.INTERNAL_SERVER_ERROR).json({ error });
};
