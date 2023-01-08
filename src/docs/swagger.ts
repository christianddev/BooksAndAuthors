import swaggerJSDoc from "swagger-jsdoc";

import type { OAS3Definition, OAS3Options } from "swagger-jsdoc";

import links from "./links";
import parameters from "./parameters";

import { DEVELOPMENT_SERVER, PRODUCTION_SERVER, SERVER_PORT } from "../helpers";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Books and Authors",
    version: "0.0.1",
  },
  servers: [
    {
      url: `http://localhost:${SERVER_PORT}`,
    },
    {
      url: `${DEVELOPMENT_SERVER}`,
    },
    {
      url: `${PRODUCTION_SERVER}`,
    },
  ],
  components: {
    securitySchemes: {
      jwtAuth: {
        // TODO: check this
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      bodyBookRequest: {
        type: "object",
        required: ["isbn", "title"],
        properties: {
          isbn: {
            type: "string",
            description:
              "the ISBN must be unique, this field allows to identify the book when performing some operations in the database.",
          },
          title: {
            type: "string",
            description:
              "field associated with an ISBN, several books can have the same title.",
          },
        },
        example: {
          isbn: "978-0-7564-0407-9",
          title: "The Name of the Wind",
        },
      },
      authorRequest: {
        type: "object",
        required: ["name", "country"],
        properties: {
          name: {
            type: "string",
            description:
              "author's name, in **combination** with the **country** field (ISO Code) is used to identify an author, the name & country field must be unique.",
          },
          country: {
            type: "string",
            description:
              "author's country in ISO code format, in combination with the name field, is used to identify an author, the name & country fields must be unique.",
          },
        },
        example: {
          name: "Patrick Rothfuss",
          country: "USA",
        },
      },
      authorWithBooksRequest: {
        type: "object",
        required: ["name", "country", "books"],
        properties: {
          name: {
            type: "string",
            description:
              "author's name, in **combination** with the **country** field (ISO Code) is used to identify an author, the name & country field must be unique.",
            example: "Patrick Rothfuss",
          },
          country: {
            type: "string",
            description:
              "author's country in ISO code format, in combination with the name field, is used to identify an author, the name & country fields must be unique.",
            example: "USA",
          },
          books: {
            type: "array",
            description:
              "Refers to the IDs set by the database to identify a record,<br><br> if the record associated to an ID does not exist or the `EXCLUDE_TEMPORARY_DELETED` configuration has been set and the record is defined as **isDeleted**, a message similar to `book with id '##' not found` is returned.",
            items: {
              type: "number",
              description: "ID of the books to be associated with this author",
            },
            example: [1, 2],
          },
        },
        example: {
          name: "Patrick Rothfuss",
          country: "USA",
          books: [1, 2],
        },
      },
      authorUpdateRequest: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description:
              "author's name, in **combination** with the **country** field (ISO Code) is used to identify an author, the name & country field must be unique.",
            example: "Patrick Rothfuss",
          },
          country: {
            type: "string",
            description:
              "author's country in ISO code format, in combination with the name field, is used to identify an author, the name & country fields must be unique.",
            example: "USA",
          },
        },
        example: {
          name: "Patrick Rothfuss",
          country: "USA",
        },
      },
      authorBooksUpdateRequest: {
        type: "object",
        required: ["books"],
        properties: {
          books: {
            type: "array",
            description:
              "Refers to the IDs set by the database to identify a record, if the record associated to an ID does not exist or the `EXCLUDE_TEMPORARY_DELETED` configuration has been set and the record is defined as **isDeleted**, a message similar to `book with id '##' not found` is returned.",
            items: {
              type: "number",
              description: "ID of the books to be associated with this author",
            },
          },
        },
        example: {
          books: [2, 3],
        },
      },
      authorsWithBooks: {
        type: "object",
        required: ["data"],
        properties: {
          data: {
            type: "object",
            required: ["author", "booksAuthors"],
            properties: {
              author: {
                type: "object",
                required: ["id", "name", "country"],
                properties: {
                  id: {
                    type: "number",
                    description:
                      "assigned by the database, is used to identify the ledger in database queries",
                  },
                  name: {
                    type: "string",
                    description:
                      "author's name, in combination with the country field (ISO Code) is used to identify an author, the name & country field must be unique.",
                  },
                  country: {
                    type: "string",
                    description:
                      "author's country in ISO code format, in combination with the name field, is used to identify an author, the name & country fields must be unique.",
                  },
                },
              },
              booksAuthors: {
                type: "object",
                required: ["data", "error"],
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        createdAt: {
                          type: "string",
                          description: "date of creation of the registry",
                        },
                        bookId: {
                          type: "number",
                          description: "Id associated with the book",
                        },
                        authorId: {
                          type: "number",
                          description: "Id associated with the author",
                        },
                      },
                    },
                  },
                  error: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["message"],
                      properties: {
                        message: {
                          type: "string",
                          description:
                            "description related to the error, return message error similar to `book with id '##' not found` ",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        example: {
          data: {
            author: {
              id: 1,
              name: "Patrick Rothfuss",
              country: "USA",
            },
            booksAuthors: {
              data: [
                {
                  createdAt: "2023-01-07T06:09:23.900Z",
                  bookId: 1,
                  authorId: 1,
                },
              ],
              error: [
                {
                  message: "book with id '11' not found",
                },
                {
                  message: "book with id '12' not found",
                },
              ],
            },
          },
        },
      },
      authors: {
        type: "object",
        required: ["data"],
        properties: {
          data: {
            type: "object",
            required: ["author"],
            properties: {
              author: {
                type: "object",
                required: ["id", "name", "country"],
                properties: {
                  id: {
                    type: "number",
                    description:
                      "assigned by the database, is used to identify the ledger in database queries",
                  },
                  name: {
                    type: "string",
                    description:
                      "author's name, in combination with the country field (ISO Code) is used to identify an author, the name & country field must be unique.",
                  },
                  country: {
                    type: "string",
                    description:
                      "author's country in ISO code format, in combination with the name field, is used to identify an author, the name & country fields must be unique.",
                  },
                },
              },
            },
          },
        },
        example: {
          data: {
            authors: [
              {
                id: 1,
                name: "Patrick Rothfuss",
                country: "USA",
              },
              {
                id: 2,
                name: "Santiago Posteguillo",
                country: "ESP",
              },
            ],
          },
        },
      },
      author: {
        type: "object",
        required: ["data"],
        properties: {
          data: {
            type: "object",
            required: ["author"],
            properties: {
              author: {
                type: "object",
                required: ["id", "name", "country"],
                properties: {
                  id: {
                    type: "number",
                    description:
                      "assigned by the database, is used to identify the ledger in database queries",
                  },
                  name: {
                    type: "string",
                    description:
                      "author's name, in combination with the country field (ISO Code) is used to identify an author, the name & country field must be unique.",
                  },
                  country: {
                    type: "string",
                    description:
                      "author's country in ISO code format, in combination with the name field, is used to identify an author, the name & country fields must be unique.",
                  },
                },
              },
            },
          },
        },
        example: {
          data: {
            author: {
              id: 1,
              name: "Patrick Rothfuss",
              country: "USA",
            },
          },
        },
      },
      authorWhitBook: {
        type: "object",
        required: ["data"],
        properties: {
          data: {
            type: "object",
            required: ["booksAuthors"],
            properties: {
              booksAuthors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "number",
                      description:
                        "assigned by the database, is used to identify the ledger in database queries",
                    },
                    name: {
                      type: "string",
                      description:
                        "author's name, in combination with the country field (ISO Code) is used to identify an author, the name & country field must be unique.",
                    },
                    country: {
                      type: "string",
                      description:
                        "author's country in ISO code format, in combination with the name field, is used to identify an author, the name & country fields must be unique.",
                    },
                    books: {
                      type: "array",
                      description: "Books associated with the author",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "number",
                            description:
                              "assigned by the database, is used to identify the ledger in database queries",
                          },
                          isbn: {
                            type: "string",
                            description:
                              "the ISBN must be unique, this field allows to identify the book when performing some operations in the database.",
                          },
                          title: {
                            type: "string",
                            description:
                              "field associated with an ISBN, several books can have the same title.",
                          },
                          booksauthors: {
                            type: "object",
                            properties: {
                              bookId: {
                                type: "number",
                                description:
                                  "assigned by the database, is used to identify the ledger in database queries",
                              },
                              authorId: {
                                type: "number",
                                description:
                                  "author's name, in combination with the country field (ISO Code) is used to identify an author, the name & country field must be unique.",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        example: {
          data: {
            booksAuthors: [
              {
                id: 1,
                name: "Patrick Rothfuss",
                country: "USA",
                books: [
                  {
                    id: 1,
                    isbn: "978-0-7564-0407-9",
                    title: "The Name of the Wind, 2007",
                    booksauthors: {
                      bookId: 1,
                      authorId: 1,
                    },
                  },
                ],
              },
              {
                id: 2,
                name: "Santiago Posteguillo",
                country: "ESP",
                books: [
                  {
                    id: 2,
                    isbn: "9788408234494",
                    title: "YO, JULIA",
                    booksauthors: {
                      bookId: 2,
                      authorId: 2,
                    },
                  },
                  {
                    id: 3,
                    isbn: "Las legiones malditas ",
                    title: "978-84-666-3768-8",
                    booksauthors: {
                      bookId: 3,
                      authorId: 2,
                    },
                  },
                ],
              },
            ],
          },
        },
      },
      internalServerError: {
        type: "object",
        required: ["error"],
        properties: {
          error: {
            type: "object",
            description: "contains information related to one or more errors",
            properties: {
              status: {
                type: "number",
                description: "status code associated with the error",
              },
              message: {
                type: "string",
                description: "description related to the error",
              },
            },
          },
        },
      },
      validateAuthorByIdDataBaseErrorResponse: {
        type: "object",
        required: ["error"],
        properties: {
          error: {
            type: "object",
            description: "contains information related to one or more errors",
            properties: {
              status: {
                type: "number",
                description: "status code associated with the error",
              },
              message: {
                type: "string",
                description: "description related to the error",
              },
            },
          },
        },
      },
      authorUpdate: {
        type: "object",
        required: ["data"],
        properties: {
          data: {
            type: "object",
            required: ["affectedRows"],
            properties: {
              affectedRows: {
                type: "array",
                items: {
                  type: "number",
                  description: "number of records affected",
                },
              },
            },
          },
        },
      },
      authorDelete: {
        type: "object",
        required: ["data"],
        properties: {
          data: {
            type: "object",
            required: ["affectedRows"],
            properties: {
              affectedRows: {
                type: "object",
                required: ["deletedBooksAuthors", "deletedBook"],
                properties: {
                  deletedBooksAuthors: {
                    type: "number",
                    description:
                      "number of author associations and books that have been permanently deleted from the **booksauthors** table",
                  },
                  deletedBook: {
                    type: "array",
                    description:
                      "number of records in the authors table that have been temporarily deleted",
                    items: {
                      types: "number",
                    },
                  },
                },
              },
            },
          },
        },
        example: {
          data: {
            affectedRows: {
              deletedBooksAuthors: 5,
              deletedBook: [1],
            },
          },
        },
      },
      authorBooksUpdateSuccess: {
        type: "object",
        required: ["data"],
        properties: {
          data: {
            type: "object",
            required: ["booksAuthors", "error"],
            properties: {
              booksAuthors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      createdAt: {
                        type: "string",
                        description: "date of creation of the registry",
                      },
                      bookId: {
                        type: "number",
                        description: "Id associated with the book",
                      },
                      authorId: {
                        type: "number",
                        description: "Id associated with the author",
                      },
                    },
                  },
                },
              },
              error: {
                type: "array",
                items: {
                  type: "object",
                  required: ["message"],
                  properties: {
                    message: {
                      type: "string",
                      description:
                        "description related to the error, return message error similar to `book with id '##' not found` ",
                    },
                  },
                },
              },
            },
          },
        },
        example: {
          data: {
            booksAuthors: [
              {
                createdAt: "2023-01-07T21:27:02.183Z",
                bookId: 2,
                authorId: 2,
              },
              {
                createdAt: "2023-01-07T21:27:02.183Z",
                bookId: 3,
                authorId: 2,
              },
            ],
          },
          error: [
            {
              message: "book with id '1' not found",
            },
          ],
        },
      },
      authorBooksUpdateBadRequest: {
        type: "object",
        required: ["error"],
        properties: {
          error: {
            type: "object",
            required: ["status", "errors"],
            properties: {
              status: {
                type: "number",
                description: "status code associated with the error",
              },
              errors: {
                type: "array",
                items: {
                  type: "object",
                  required: ["message"],
                  properties: {
                    message: {
                      type: "string",
                      description:
                        "description related to the error, return message error similar to `book with id '##' not found` ",
                    },
                  },
                },
              },
            },
          },
        },
        example: {
          error: {
            status: 400,
            errors: [
              {
                message:
                  "there is an author with the bookId '1' & authorId '1'",
              },
              {
                message: "book with id '1' not found",
              },
            ],
          },
        },
      },
    },
    parameters,
    responses: {
      internalServerError: {
        description:
          "Internal Server Error, you should contact the administrator or check the logs",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/internalServerError",
            },
          },
        },
      },
      defaultBadRequest: {
        description: "Bad Request, Error related to the request data",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/internalServerError",
            },
          },
        },
      },
      defaultNotFound: {
        description: "Not Found, Error related to the request data.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/internalServerError",
            },
          },
        },
      },
      authorPostBadRequest: {
        description:
          "Bad Request, Error related to the request data, **name** and **country** fields must not be null, if you do not send some of these fields, an error similar to `check **####** field` will be returned.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/internalServerError",
            },
          },
        },
      },
      authorWithBooksPostBadRequest: {
        description:
          "Bad Request, Error related to the request data, **name** , **country** and **books** fields must not be null, if you do not send some of these fields, an error similar to `check **####** field` will be returned.<br><br>if the combination between **name** and **country** already exists in the database, it returns an error message similar to `a authors exists with the name '#####' & country '###'`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/internalServerError",
            },
          },
        },
      },
      authorsList: {
        description:
          "Returns a list of authors, taking into account the setting of environment variables `EXCLUDE_ORM_FIELDS` and `EXCLUDE_TEMPORARY_DELETED`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/authors",
            },
          },
        },
      },
      author: {
        description:
          "Returns the information of an author, taking into account the setting of environment variables `EXCLUDE_ORM_FIELDS` and `EXCLUDE_TEMPORARY_DELETED`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/author",
            },
          },
        },
        links: {
          getAuthorById: { $ref: "#/components/links/getAuthorById" },
        },
      },
      authorsWithBooks: {
        description:
          "Returns the information of the new record in the field **author**, in the **booksAuthors** field it returns information related to the association between the author and his books, in case some of the books are not available, an error message will be sent, <br><br>the response of this endpoint takes into account the setting of environment variables `EXCLUDE_ORM_FIELDS` and `EXCLUDE_TEMPORARY_DELETED`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/authorsWithBooks",
            },
          },
        },
      },
      authorWithBooksList: {
        description:
          "Returns the information of an author, taking into account the setting of environment variables `EXCLUDE_ORM_FIELDS` and `EXCLUDE_TEMPORARY_DELETED`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/authorWhitBook",
            },
          },
        },
      },
      authorUpdated: {
        description:
          "Update the author's name or country,, taking into account the setting of environment variables `EXCLUDE_TEMPORARY_DELETED`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/authorUpdate",
            },
          },
        },
      },
      authorBooksUpdated: {
        description:
          "Updates the register of books associated with an author, taking into account the setting of environment variables `EXCLUDE_TEMPORARY_DELETED`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/authorBooksUpdateSuccess",
            },
          },
        },
      },
      authorPatchBadRequest: {
        description:
          "Bad Request, Error related to the request data, **name** , **country** and **books** fields must not be null,<br><br> - if the combination between **name** and **country** already exists in the database, it returns an error message similar to `a authors exists with the name '#####' & country '###'`.<br> - if you do not send both fields, it will return an error message similar to `check 'name' & 'country' field`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/internalServerError",
            },
          },
        },
      },
      authorBookPatchBadRequest: {
        description:
          "Bad Request.<br>If the record associated to an ID does not exist or the `EXCLUDE_TEMPORARY_DELETED` configuration has been set and the record is defined as **isDeleted**, a message similar to `book with id '##' not found` is returned.<br><br> if the relationship between the author and the book has been made previously, an error message is returned similar to `there is an author with the bookId '##' & authorId '##'`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/authorBooksUpdateBadRequest",
            },
          },
        },
      },
      authorDeleted: {
        description: "Delete a record temporarily.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/authorDelete",
            },
          },
        },
      },
    },
    links,
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes/v1/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);
