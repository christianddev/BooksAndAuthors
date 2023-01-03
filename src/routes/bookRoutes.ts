import { Router } from "express";
import {
  getBook,
  getBooks,
  postBook,
  putBook,
  deleteBook,
  getAllBooksAuthorsGroupByBook,
  postBookWithAuthors,
} from "../controllers";
import {
  validateId,
  validateBookById,
  validateTitle,
  validateISBNAndTitleNotFalsy,
  validateISBN,
  validateAuthorIDs,
  validateBookByISBN,
} from "../middlewares/";

export const bookRouter = Router();

bookRouter.get("/", getBooks);
bookRouter.get("/:id", [validateId], getBook);
bookRouter.get("/all/authors", getAllBooksAuthorsGroupByBook);
bookRouter.post(
  "/",
  [validateISBN, validateTitle, validateBookByISBN],
  postBook
);
bookRouter.post(
  "/authors",
  [validateISBN, validateTitle, validateBookByISBN, validateAuthorIDs],
  postBookWithAuthors
);
bookRouter.put(
  "/:id",
  [validateId, validateBookById, validateISBNAndTitleNotFalsy],
  putBook
);
bookRouter.delete("/:id", [validateId, validateBookById], deleteBook);
