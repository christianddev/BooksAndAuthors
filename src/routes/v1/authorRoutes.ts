import { Router } from "express";

import {
  getAuthor,
  getAuthors,
  postAuthor,
  patchAuthor,
  deleteAuthor,
  getAllBooksAuthorsGroupByAuthor,
  postAuthorWithBooks,
  patchAuthorWithBooks,
} from "../../controllers";
import {
  validateAuthorByIdDataBase,
  validateAuthorByNameAndCountryDataBase,
  validateBookIDs,
  validateCountry,
  validateId,
  validateName,
  validateNameAndCountryNotFalsy,
} from "../../middlewares";

export const authorRouter = Router();

/**
 * Get Authors
 * @openapi
 * /api/v1/authors:
 *    get:
 *      tags:
 *        - Authors
 *      operationId: getAllAuthors
 *      summary: "Get list of Authors"
 *      description: "returns a list of authors, if the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed, if the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/authorsList"
 *        '500':
 *          $ref: "#/components/responses/defaultError"
 *      security:
 *       - jwtAuth: []
 */
authorRouter.get("/", getAuthors);

/**
 * Get Author
 * @openapi
 * /api/v1/authors/{id}:
 *    get:
 *      tags:
 *        - Authors
 *      summary: "Get Author"
 *      operationId: getAuthor
 *      parameters:
 *        - $ref: "#/components/parameters/id"
 *      description: "Returns the information of an author, if the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed, if the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/author"
 *        '400':
 *          $ref: "#/components/responses/badRequestDefault"
 *        '404':
 *          $ref: "#/components/responses/defaultNotFound"
 *        '500':
 *          $ref: "#/components/responses/defaultError"
 *      security:
 *       - jwtAuth: []
 */
authorRouter.get("/:id", [validateId], getAuthor);

/**
 * Get all authors and his books
 * @openapi
 * /api/v1/authors/all/books:
 *    get:
 *      tags:
 *        - Authors
 *      summary: "Get all authors and his books"
 *      operationId: getAllAuthorsWithBooks
 *      description: "Get all authors and their books that may be associated with them,<br><br> - if the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed, <br> - if the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/authorWithBooksList"
 *        '400':
 *          $ref: "#/components/responses/defaultBadRequest"
 *        '500':
 *          $ref: "#/components/responses/defaultError"
 *      security:
 *       - jwtAuth: []
 */
authorRouter.get("/all/books", getAllBooksAuthorsGroupByAuthor);

/**
 * Create Author
 * @openapi
 * /api/v1/authors:
 *    post:
 *      tags:
 *        - Authors
 *      summary: "Create Author"
 *      operationId: createAuthor
 *      description: "This endpoint is used to register a **Author**"
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/authorRequest"
 *      responses:
 *        '201':
 *          $ref: "#/components/responses/author"
 *        '400':
 *          $ref: "#/components/responses/authorPostBadRequest"
 *        '500':
 *          $ref: "#/components/responses/defaultError"
 *      security:
 *       - jwtAuth: []
 */
authorRouter.post(
  "/",
  [validateName, validateCountry, validateAuthorByNameAndCountryDataBase],
  postAuthor
);

/**
 * Create Author with Books
 * @openapi
 * /api/v1/authors/books:
 *    post:
 *      tags:
 *        - Authors
 *      summary: "Create Author  with Books"
 *      operationId: createAuthorWithBooks
 *      description: "This endpoint will add a new record to the authors table, in case this registration process is completed correctly, it will try to add to the **booksauthors** table the relation with the IDs of the **books** field, in case a book is not found in the database, either because it does not exist or because it is a record that has been temporarily deleted (**isDeleted** equals true) an error message will be returned: example: `book with id '##' not found`."
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/authorWithBooksRequest"
 *      responses:
 *        '201':
 *          $ref: "#/components/responses/authorsWithBooks"
 *        '400':
 *          $ref: "#/components/responses/authorWithBooksPostBadRequest"
 *        '500':
 *          $ref: "#/components/responses/defaultError"
 *      security:
 *       - jwtAuth: []
 */
authorRouter.post(
  "/books",
  [
    validateName,
    validateCountry,
    validateAuthorByNameAndCountryDataBase,
    validateBookIDs,
  ],
  postAuthorWithBooks
);

/**
 * Update Author
 * @openapi
 * /api/v1/authors/{id}:
 *    patch:
 *      tags:
 *        - Authors
 *      summary: "Update Author"
 *      operationId: updateAuthor
 *      parameters:
 *        - $ref: "#/components/parameters/id"
 *      description: "Update the author's name or country, the new data must be unique in combination."
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/authorUpdateRequest"
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/authorUpdated"
 *        '400':
 *          $ref: "#/components/responses/authorPatchBadRequest"
 *        '500':
 *          $ref: "#/components/responses/defaultError"
 *      security:
 *       - jwtAuth: []
 */
authorRouter.patch(
  "/:id",
  [
    validateId,
    validateNameAndCountryNotFalsy,
    validateAuthorByIdDataBase,
    validateAuthorByNameAndCountryDataBase,
  ],
  patchAuthor
);

/**
 * Set Books
 * @openapi
 * /api/v1/authors/{id}/books:
 *    patch:
 *      tags:
 *        - Authors
 *      summary: "Set Books"
 *      operationId: setBooks
 *      parameters:
 *        - $ref: "#/components/parameters/id"
 *      description: "Associates books with an author, If the author exists, it will try to add to the **booksauthors** table the relation with the IDs of the **books** field, in case a book is not found in the database, either because it does not exist or because it is a record that has been temporarily deleted (**isDeleted** equals true) an error message will be returned: example: `book with id '##' not found`. <br><br>if a relationship between an author and a book already exists, it will return a message similar to `there is an author with the bookId '##' & authorId '##'`."
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/authorBooksUpdateRequest"
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/authorBooksUpdated"
 *        '400':
 *          $ref: "#/components/responses/authorBookPatchBadRequest"
 *        '404':
 *          $ref: "#/components/responses/defaultNotFound"
 *        '500':
 *          $ref: "#/components/responses/defaultError"
 *      security:
 *       - jwtAuth: []
 */
authorRouter.patch(
  "/:id/books",
  [validateId, validateBookIDs, validateAuthorByIdDataBase],
  patchAuthorWithBooks
);

/**
 * Delete Author
 * @openapi
 * /api/v1/authors/{id}:
 *    delete:
 *      tags:
 *        - Authors
 *      summary: "Delete Author"
 *      operationId: deleteAuthor
 *      parameters:
 *        - $ref: "#/components/parameters/id"
 *      description: "Deletes a user's record, `by default records are not permanently deleted`, deleting a record means deleting its relationship with books in the **booksauthors** table, and updating the author table with the **isDeleted** property set to true."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/authorDeleted"
 *        '404':
 *          $ref: "#/components/responses/defaultNotFound"
 *        '500':
 *          $ref: "#/components/responses/defaultError"
 *      security:
 *       - jwtAuth: []
 */
authorRouter.delete(
  "/:id",
  [validateId, validateAuthorByIdDataBase],
  deleteAuthor
);
