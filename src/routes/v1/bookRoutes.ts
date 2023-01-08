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

/**
 * Get list of Books
 * @openapi
 * /api/v1/books:
 *    get:
 *      tags:
 *        - Books
 *      operationId: getAllBooks
 *      summary: "Get list of Books"
 *      description: "Returns a list of books.<br><br>if the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed.<br><br> if the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/getBooks"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
bookRouter.get("/", getBooks);

/**
 * Get Book
 * @openapi
 * /api/v1/books/{id}:
 *    get:
 *      tags:
 *        - Books
 *      summary: "Get Book"
 *      operationId: getBook
 *      parameters:
 *        - $ref: "#/components/parameters/id"
 *      description: "Returns the information of an book.<br><br>If the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed.<br><br>If the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/getBook"
 *        '404':
 *          $ref: "#/components/responses/bookNotFound"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
bookRouter.get("/:id", [validateId], getBook);

/**
 * Get all books and his authors
 * @openapi
 * /api/v1/books/all/authors:
 *    get:
 *      tags:
 *        - Books
 *      summary: "Get all books and his authors"
 *      operationId: getAllBooksWithAuthors
 *      description: "Get all books and their authors that may be associated with them.<br><br>If the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed.<br><br>If the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/getBooksAndHisAuthors"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
bookRouter.get("/all/authors", getAllBooksAuthorsGroupByBook);

/**
 * Create Book
 * @openapi
 * /api/v1/books:
 *    post:
 *      tags:
 *        - Books
 *      summary: "Create Book"
 *      operationId: createBook
 *      description: "This endpoint will add a new record to the **books** table.<br><br>**isbn** and **title** fields must be unique"
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/bookRequest"
 *      responses:
 *        '201':
 *          $ref: "#/components/responses/postBook"
 *        '400':
 *          $ref: "#/components/responses/postBookBadRequest"
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
