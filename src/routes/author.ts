import { Router } from "express";
import {
  getAuthor,
  getAuthors,
  postAuthor,
  putAuthor,
  deleteAuthor,
  getAllBooksAuthorsGroupByAuthor,
} from "../controllers/";
import {
  validateAuthorById,
  validateAuthorByNameAndCountry,
  validateBookIDs,
  validateCountry,
  validateId,
  validateName,
  validateNameAndCountry,
} from "../middlewares/";

export const authorRouter = Router();

authorRouter.get("/", getAuthors);
authorRouter.get("/:id", [validateId], getAuthor);
authorRouter.get("/all/books", getAllBooksAuthorsGroupByAuthor);
authorRouter.post(
  "/",
  [validateName, validateCountry, validateAuthorByNameAndCountry],
  postAuthor
);
authorRouter.post(
  "/books",
  [validateName, validateCountry, validateBookIDs],
  postAuthor
);
authorRouter.put(
  "/:id",
  [validateId, validateAuthorById, validateNameAndCountry],
  putAuthor
);
authorRouter.delete("/:id", [validateId, validateAuthorById], deleteAuthor);
