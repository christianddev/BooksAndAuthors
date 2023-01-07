import swaggerJSDoc from "swagger-jsdoc";

import type { OAS3Definition, OAS3Options } from "swagger-jsdoc";

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
              "Refers to the IDs set by the database to identify a record, if the record associated to an ID does not exist or the `EXCLUDE_TEMPORARY_DELETED` configuration has been set and the record is defined as **isDeleted**, a message similar to `book with id '##' not found` is returned.",
            items: {
              type: "string",
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

      authorsWithBooksResponse: {
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
                      required: ["data", "error"],
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
      authorsResponse: {
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
      authorResponse: {
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
      defaultErrorResponse: {
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
    },
    parameters: {
      id: {
        name: "id",
        in: "path",
        description: "ID of the item to retrieve",
        required: true,
        schema: {
          type: "number",
        },
      },
    },
    responses: {
      defaultErrorResponse: {
        description:
          "Internal Server Error, you should contact the administrator or check the logs",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/defaultErrorResponse",
            },
          },
        },
      },
      badRequestErrorResponse: {
        description: "Bad Request, Error related to the request data",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/defaultErrorResponse",
            },
          },
        },
      },
      authorPostBadRequestErrorResponse: {
        description:
          "Bad Request, Error related to the request data, **name** and **country** fields must not be null, if you do not send some of these fields, an error similar to `check **####** field` will be returned.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/defaultErrorResponse",
            },
          },
        },
      },
      authorWithBooksPostBadRequestErrorResponse: {
        description:
          "Bad Request, Error related to the request data, **name** , **country** and **books** fields must not be null, if you do not send some of these fields, an error similar to `check **####** field` will be returned.<br><br>if the combination between **name** and **country** already exists in the database, it returns an error message similar to `a authors exists with the name '#####' & country '###'`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/defaultErrorResponse",
            },
          },
        },
      },
      notFoundRequestErrorResponse: {
        description: "Not Found, Error related to the request data.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/defaultErrorResponse",
            },
          },
        },
      },
      authorsResponse: {
        description:
          "Returns a list of authors, taking into account the setting of environment variables `EXCLUDE_ORM_FIELDS` and `EXCLUDE_TEMPORARY_DELETED`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/authorsResponse",
            },
          },
        },
      },
      authorsWithBooksResponse: {
        description:
          "Returns the information of the new record in the field **author**, in the **booksAuthors** field it returns information related to the association between the author and his books, in case some of the books are not available, an error message will be sent, <br><br>the response of this endpoint takes into account the setting of environment variables `EXCLUDE_ORM_FIELDS` and `EXCLUDE_TEMPORARY_DELETED`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/authorsWithBooksResponse",
            },
          },
        },
      },
      authorResponse: {
        description:
          "Returns the information of an author, taking into account the setting of environment variables `EXCLUDE_ORM_FIELDS` and `EXCLUDE_TEMPORARY_DELETED`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/authorResponse",
            },
          },
        },
        links: {
          getAuthorById: { $ref: "#/components/links/getAuthorById" },
        },
      },
    },
    links: {
      getAuthorById: {
        operationId: "getAuthor",
        description:
          "The `id` value returned in the response can be used as  the Id` parameter in `GET api/v1/authors/{id}`.",
        parameters: {
          id: "$request.path.id",
        },
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes/v1/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);
