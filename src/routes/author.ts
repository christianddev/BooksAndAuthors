import { Router } from "express";
import {
  getAuthor,
  getAuthors,
  postAuthor,
  putAuthor,
  deleteAuthor,
  getAllBooksAuthorsGroupByAuthor,
} from "../controllers/";

export const authorRouter = Router();

authorRouter.get("/", getAuthors);
authorRouter.get("/:id", getAuthor);
authorRouter.get("/all/books", getAllBooksAuthorsGroupByAuthor);
authorRouter.post("/", postAuthor);
authorRouter.post("/books", postAuthor);
authorRouter.put("/:id", putAuthor);
authorRouter.delete("/:id", deleteAuthor);

