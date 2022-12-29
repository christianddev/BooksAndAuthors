import { Router } from "express";
import {
  getBook,
  getBooks,
  postBook,
  putBook,
  deleteBook,
  getAllBooksAuthorsGroupByBook,
} from "../controllers";

export const bookRouter = Router();

bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBook);
bookRouter.get("/authors", getAllBooksAuthorsGroupByBook);
bookRouter.post("/", postBook);
bookRouter.put("/:id", putBook);
bookRouter.delete("/:id", deleteBook);
// bookRouter.get("/:bookId/authors", getBooksAuthorsByBook);
