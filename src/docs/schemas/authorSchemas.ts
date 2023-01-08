import type { OAS3Definition } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "",
  info: {
    title: "",
    version: "",
  },
  components: {
    schemas: {
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
      authorBadRequest: {
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
      },
      getAuthors: {
        type: "object",
        required: ["data"],
        properties: {
          data: {
            type: "object",
            required: ["authors"],
            properties: {
              authors: {
                type: "array",
                items: {
                  type: "object",
                  required: ["id", "name", "country"],
                  properties: {
                    id: {
                      type: "number",
                      description:
                        "Assigned by the database, is used to identify the ledger in database queries",
                    },
                    name: {
                      type: "string",
                      description:
                        "Author's name, in combination with the country field (ISO Code) is used to identify an author, the name & country field must be unique.",
                    },
                    country: {
                      type: "string",
                      description:
                        "Author's country in ISO code format, in combination with the name field, is used to identify an author, the name & country fields must be unique.",
                    },
                  },
                },
              },
            },
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
      },
      authorsAndHisBooks: {
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
                    books: {
                      type: "array",
                      description: "Books associated with the author",
                      items: {
                        type: "object",
                        required: ["id", "isbn", "title"],
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
      authorDeleted: {
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
                      "number of author associations and books that have been permanently deleted from the **booksauthors** table.",
                  },
                  deletedBook: {
                    type: "array",
                    description:
                      "number of records in the **authors** table that have been **temporarily** or **permanently** deleted.",
                    items: {
                      types: "number",
                    },
                  },
                },
              },
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
      },
    },
  },
};

export default swaggerDefinition?.components?.schemas;
