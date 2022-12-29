import { Router } from "express";
import {
  getAllBooksAuthors,
  // getBooksAuthorsByBook,
  // getBooksAuthorsByAuthor,
  // postBookAuthor,
  // deleteBookAuthor,
} from "../controllers";

export const bookAuthorRouter = Router();

bookAuthorRouter.get("/", getAllBooksAuthors);
// bookAuthorRouter.get("/:bookId/authors", getBooksAuthorsByBook);
// bookAuthorRouter.get("/:authorId/books", getBooksAuthorsByAuthor);
// bookAuthorRouter.post("/", postBookAuthor);
// // bookAuthorRouter.put("/:id", putAuthor);
// bookAuthorRouter.delete("/", deleteBookAuthor);
