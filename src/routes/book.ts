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
import { validateId } from "../middlewares/fieldsValidators";

export const bookRouter = Router();

bookRouter.get("/", getBooks);
bookRouter.get("/:id", [validateId], getBook);
bookRouter.get("/all/authors", getAllBooksAuthorsGroupByBook);
bookRouter.post("/", postBook);
bookRouter.post("/authors", postBookWithAuthors);
bookRouter.put("/:id", putBook);
bookRouter.delete("/:id", deleteBook);
