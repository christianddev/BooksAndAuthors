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
  validateBookByIdDataBase,
  validateTitle,
  validateISBNAndTitleNotFalsy,
  validateISBN,
  validateAuthorIDs,
  validateBookByISBNDataBase,
} from "../middlewares/";

export const bookRouter = Router();

bookRouter.get("/", getBooks);
bookRouter.get("/:id", [validateId], getBook);
bookRouter.get("/all/authors", getAllBooksAuthorsGroupByBook);
bookRouter.post(
  "/",
  [validateISBN, validateTitle, validateBookByISBNDataBase],
  postBook
);
bookRouter.post(
  "/authors",
  [validateISBN, validateTitle, validateAuthorIDs, validateBookByISBNDataBase],
  postBookWithAuthors
);
bookRouter.put(
  "/:id",
  [validateId, validateISBNAndTitleNotFalsy, validateBookByIdDataBase],
  putBook
);
bookRouter.delete("/:id", [validateId, validateBookByIdDataBase], deleteBook);
