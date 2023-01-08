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
 *      description: "This endpoint will add a new record to the **books** table.<br><br>**isbn** field must be unique"
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

/**
 * Create Book with Authors
 * @openapi
 * /api/v1/books/authors:
 *    post:
 *      tags:
 *        - Books
 *      summary: "Create Book with Authors"
 *      operationId: createBookWithAuthors
 *      description: "This endpoint will add a new record to the **books** table.<br><br>In case this registration process is completed correctly, it will try to add to the **booksauthors** table the relation with the IDs of the **authors** field.<br><br>In case a **author** is not found in the database, either because it does not exist or because it is a record that has been temporarily deleted (**isDeleted** field equals true), an error message will be returned: example: `author with id '##' not found`."
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/bookWithAuthorsRequest"
 *      responses:
 *        '201':
 *          $ref: "#/components/responses/postBookWithAuthors"
 *        '400':
 *          $ref: "#/components/responses/postBookWithAuthorsBadRequest"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
bookRouter.post(
  "/authors",
  [validateISBN, validateTitle, validateAuthorIDs, validateBookByISBNDataBase],
  postBookWithAuthors
);


/**
 * Update Book
 * @openapi
 * /api/v1/books/{id}:
 *    patch:
 *      tags:
 *        - Books
 *      summary: "Update Book"
 *      operationId: updateBook
 *      parameters:
 *        - $ref: "#/components/parameters/id"
 *      description: "Update the books's **isbn** or **title**, **isbn** must be unique in the database."
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/bookUpdateRequest"
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/patchBook"
 *        '400':
 *          $ref: "#/components/responses/patchBookBadRequest"
 *        '404':
 *          $ref: "#/components/responses/bookNotFound"
 *        '500':
 *          $ref: "#/components/responses/internalServerError"
 *      security:
 *       - jwtAuth: []
 */
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
