import { Router } from "express";

import {
  getAuthor,
  getAuthors,
  postAuthor,
  putAuthor,
  deleteAuthor,
  getAllBooksAuthorsGroupByAuthor,
  postAuthorWithBooks,
  putAuthorWithBooks,
} from "../controllers";
import {
  validateAuthorByIdDataBase,
  validateAuthorByNameAndCountryDataBase,
  validateBookIDs,
  validateCountry,
  validateId,
  validateName,
  validateNameAndCountryNotFalsy,
} from "../middlewares";

export const authorRouter = Router();

authorRouter.get("/", getAuthors);
authorRouter.get("/:id", [validateId], getAuthor);
authorRouter.get("/all/books", getAllBooksAuthorsGroupByAuthor);
authorRouter.post(
  "/",
  [validateName, validateCountry, validateAuthorByNameAndCountryDataBase],
  postAuthor
);
authorRouter.post(
  "/books",
  [
    validateName,
    validateCountry,
    validateAuthorByNameAndCountryDataBase,
    validateBookIDs,
  ],
  postAuthorWithBooks
);
authorRouter.put(
  "/:id",
  [validateId, validateNameAndCountryNotFalsy, validateAuthorByIdDataBase],
  putAuthor
);
authorRouter.put(
  "/:id/books",
  [validateId, validateBookIDs, validateAuthorByIdDataBase],
  putAuthorWithBooks
);
authorRouter.delete(
  "/:id",
  [validateId, validateAuthorByIdDataBase],
  deleteAuthor
);
