import { Router } from "express";
import {
  getAuthor,
  getAuthors,
  postAuthor,
  putAuthor,
  deleteAuthor,
} from "../controllers/authors";

const router = Router();

router.get("/", getAuthors);
router.get("/:id", getAuthor);
router.post("/", postAuthor);
router.put("/:id", putAuthor);
router.delete("/:id", deleteAuthor);

export default router;
