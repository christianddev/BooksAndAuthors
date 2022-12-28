import { Router } from "express";
import {
  getBook,
  getBooks,
  postBook,
  putBook,
  deleteBook,
} from "../controllers";

export const bookRouter = Router();

bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBook);
bookRouter.post("/", postBook);
bookRouter.put("/:id", putBook);
bookRouter.delete("/:id", deleteBook);
