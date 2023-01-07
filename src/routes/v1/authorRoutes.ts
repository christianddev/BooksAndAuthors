import { Router } from "express";

import {
  getAuthor,
  getAuthors,
  postAuthor,
  putAuthor,
  deleteAuthor,
  getAllBooksAuthorsGroupByAuthor,
  postAuthorWithBooks,
  putAuthorWithBooks,
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
 *      operationId: getAuthors
 *      summary: "Get list of Authors"
 *      description: "returns a list of authors, if the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed, if the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/authorsResponse"
 *        '500':
 *          $ref: "#/components/responses/defaultErrorResponse"
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
 *          $ref: "#/components/responses/authorResponse"
 *        '400':
 *          $ref: "#/components/responses/badRequestErrorResponse"
 *        '404':
 *          $ref: "#/components/responses/notFoundRequestErrorResponse"
 *        '500':
 *          $ref: "#/components/responses/defaultErrorResponse"
 *      security:
 *       - jwtAuth: []
 */
authorRouter.get("/:id", [validateId], getAuthor);


/**
 * Get all Authors
 * @openapi
 * /api/v1/authors/all/books:
 *    get:
 *      tags:
 *        - Authors
 *      summary: "Get all authors and his books"
 *      operationId: getAllAuthors
 *      description: "Get all authors and their books that may be associated with them,<br><br> - if the environment variable `EXCLUDE_ORM_FIELDS` is active, the **isDeleted**, **createdAt** and **updatedAt** fields are displayed, <br> - if the environment variable `EXCLUDE_TEMPORARY_DELETED` is active, it does not return the records where the **isDeleted** field is **true**."
 *      responses:
 *        '200':
 *          $ref: "#/components/responses/authorWithBooksResponse"
 *        '400':
 *          $ref: "#/components/responses/badRequestErrorResponse"
 *        '500':
 *          $ref: "#/components/responses/defaultErrorResponse"
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
 *          $ref: "#/components/responses/authorResponse"
 *        '400':
 *          $ref: "#/components/responses/authorPostBadRequestErrorResponse"
 *        '500':
 *          $ref: "#/components/responses/defaultErrorResponse"
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
 *          $ref: "#/components/responses/authorsWithBooksResponse"
 *        '400':
 *          $ref: "#/components/responses/authorWithBooksPostBadRequestErrorResponse"
 *        '500':
 *          $ref: "#/components/responses/defaultErrorResponse"
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
 *          $ref: "#/components/responses/defaultUpdateResponse"
 *        '400':
 *          $ref: "#/components/responses/authorPatchBadRequestErrorResponse"
 *        '500':
 *          $ref: "#/components/responses/defaultErrorResponse"
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
  putAuthor
);

authorRouter.patch(
  "/:id/books",
  [validateId, validateBookIDs, validateAuthorByIdDataBase],
  putAuthorWithBooks
);

authorRouter.delete(
  "/:id",
  [validateId, validateAuthorByIdDataBase],
  deleteAuthor
);
