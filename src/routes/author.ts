import { Router } from "express";
import {
  getAuthor,
  getAuthors,
  postAuthor,
  putAuthor,
  deleteAuthor,
} from "../controllers/";

export const authorRouter = Router();

authorRouter.get("/", getAuthors);
authorRouter.get("/:id", getAuthor);
authorRouter.post("/", postAuthor);
authorRouter.put("/:id", putAuthor);
authorRouter.delete("/:id", deleteAuthor);
