import { Router } from "express";

import {
  getBook,
  getBooks,
  postBook,
  patchBook,
  deleteBook,
  getAllBooksAuthorsGroupByBook,
  postBookWithAuthors,
  patchBookWithAuthors,
} from "../../controllers";
import {
  validateId,
  validateBookByIdDataBase,
  validateTitle,
  validateISBNAndTitleNotFalsy,
  validateISBN,
  validateAuthorIDs,
  validateBookByISBNDataBase,
} from "../../middlewares";

export const bookRouter = Router();

bookRouter.get("/", getBooks);
bookRouter.get("/:id", [validateId], getBook);
bookRouter.get("/all/authors", getAllBooksAuthorsGroupByBook);

/**
 * Create Book
 * @openapi
 * /api/v1/books:
 *    post:
 *      tags:
 *        - Books
 *      summary: "Create Book"
 *      description: "This endpoint is used to register a book, the ISBN must be unique."
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/bodyBookRequest"
 *      responses:
 *        '200':
 *          description: returns information related to the book that has been created, if the environment variable `EXCLUDE_ORM_FIELDS` is active, the fields **isDeleted**, **createdAt** and **updatedAt** are displayed.
 *        '400':
 *          $ref: "#/components/responses/badRequest"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
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
bookRouter.patch(
  "/:id",
  [
    validateId,
    validateISBNAndTitleNotFalsy,
    validateBookByIdDataBase,
    validateBookByISBNDataBase,
  ],
  patchBook
);

bookRouter.patch(
  "/:id/authors",
  [validateId, validateAuthorIDs, validateBookByIdDataBase],
  patchBookWithAuthors
);
bookRouter.delete("/:id", [validateId, validateBookByIdDataBase], deleteBook);
