import type { OAS3Definition } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "",
  info: {
    title: "",
    version: "",
  },
  components: {
    schemas: {
      bookRequest: {
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
      bookBadRequest: {
        type: "object",
        required: ["error"],
        properties: {
          error: {
            type: "object",
            description: "Contains information related to one or more errors.",
            properties: {
              status: {
                type: "number",
                description: "Status code associated with the error.",
              },
              message: {
                type: "string",
                description: "Description related to the error.",
              },
            },
          },
        },
      },
      bookWithAuthorsRequest: {
        type: "object",
        required: ["name", "country", "authors"],
        properties: {
          isbn: {
            type: "string",
            description:
              "Book's isbn, in combination with the **title** field, is used to identify an book, the **isbn** field must be unique.",
          },
          title: {
            type: "string",
            description:
              "Books's title, in combination with the **isbn** field, is used to identify an book, the **isbn** field must be unique.",
          },
          authors: {
            type: "array",
            description:
              "Refers to the IDs set by the database to identify a record,<br><br> if the record associated to an ID does not exist or the `EXCLUDE_TEMPORARY_DELETED` configuration has been set and the record is defined as **isDeleted**.<br>A message similar to `author with id '##' not found` is returned.",
            items: {
              type: "number",
              description: "ID of the authors to be associated with this book",
            },
            example: [1, 2],
          },
        },
        example: {
          isbn: "978-0-7564-0407-9",
          title: "The Name of the Wind, 2007",
          authors: [1, 2],
        },
      },
      bookUpdateRequest: {
        type: "object",
        properties: {
          isbn: {
            type: "string",
            description: "**isbn** must be unique in the database.",
            example: "978-0-7564-0407-9",
          },
          title: {
            type: "string",
            description:
              "Author's country in ISO code format, in combination with the name field, is used to identify an author, the name & country fields must be unique.",
            example: "The Name of the Wind.",
          },
        },
        example: {
          isbn: "978-0-7564-0407-9",
          title: "The Name of the Wind.",
        },
      },
      booksAuthorsUpdateRequest: {
        type: "object",
        required: ["authors"],
        properties: {
          authors: {
            type: "array",
            description:
              "Refers to the IDs set by the database to identify a record.<br><br>If the record associated to an ID does not exist or the `EXCLUDE_TEMPORARY_DELETED` configuration has been set and the record is defined as **isDeleted**.<br>A message similar to `author with id '##' not found` is returned.",
            items: {
              type: "number",
              description:
                "ID of the authors to be associated with this author",
            },
          },
        },
        example: {
          authors: [2, 3],
        },
      },
      booksWithAuthors: {
        type: "object",
        required: ["data"],
        properties: {
          data: {
            type: "object",
            required: ["book", "booksAuthors"],
            properties: {
              book: {
                type: "object",
                required: ["id", "isbn", "title"],
                properties: {
                  id: {
                    type: "number",
                    description:
                      "Assigned by the database, is used to identify the ledger in database queries.",
                  },
                  isbn: {
                    type: "string",
                    description:
                      "Book's isbn, in combination with the **title** field, is used to identify an book, the **isbn** field must be unique.",
                  },
                  title: {
                    type: "string",
                    description:
                      "Books's title, in combination with the **isbn** field, is used to identify an book, the **isbn** field must be unique.",
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
                          description: "Date of creation of the registry",
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
                            "Description related to the error.<br>Return message error similar to `author with id '##' not found`.",
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
      getBooks: {
        type: "object",
        required: ["data"],
        properties: {
          data: {
            type: "object",
            required: ["author"],
            properties: {
              books: {
                type: "array",
                items: {
                  type: "object",
                  required: ["id", "isbn", "title"],
                  properties: {
                    id: {
                      type: "number",
                      description:
                        "Assigned by the database, is used to identify the ledger in database queries.",
                    },
                    isbn: {
                      type: "string",
                      description:
                        "Book's isbn, in combination with the **title** field, is used to identify an book, the **isbn** field must be unique.",
                    },
                    title: {
                      type: "string",
                      description:
                        "Books's title, in combination with the **isbn** field, is used to identify an book, the **isbn** field must be unique.",
                    },
                  },
                },
              },
            },
          },
        },
      },
      book: {
        type: "object",
        required: ["data"],
        properties: {
          data: {
            type: "object",
            required: ["author"],
            properties: {
              author: {
                type: "object",
                required: ["id", "isbn", "title"],
                properties: {
                  id: {
                    type: "number",
                    description:
                      "Assigned by the database, is used to identify the ledger in database queries.",
                  },
                  isbn: {
                    type: "string",
                    description:
                      "Book's isbn, in combination with the **title** field, is used to identify an book, the **isbn** field must be unique.",
                  },
                  title: {
                    type: "string",
                    description:
                      "Books's title, in combination with the **isbn** field, is used to identify an book, the **isbn** field must be unique.",
                  },
                },
              },
            },
          },
        },
      },
      booksAndHisAuthors: {
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
                  required: ["id", "isbn", "title"],
                  properties: {
                    id: {
                      type: "number",
                      description:
                        "Assigned by the database, is used to identify the ledger in database queries.",
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
                    authors: {
                      type: "array",
                      description: "Authors associated with the book",
                      items: {
                        type: "object",
                        required: ["id", "name", "country"],
                        properties: {
                          id: {
                            type: "number",
                            description:
                              "Assigned by the database, is used to identify the ledger in database queries.",
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
                          booksauthors: {
                            type: "object",
                            properties: {
                              bookId: {
                                type: "number",
                                description:
                                  "Assigned by the database, is used to identify the ledger in database queries.",
                              },
                              authorId: {
                                type: "number",
                                description:
                                  "Author's name, in combination with the country field (ISO Code) is used to identify an author, the name & country field must be unique.",
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
      bookUpdate: {
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
                  description: "Number of records affected.",
                },
              },
            },
          },
        },
      },
      bookDeleted: {
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
                      "Number of author associations and books that have been permanently deleted from the **booksauthors** table.",
                  },
                  deletedBook: {
                    type: "array",
                    description:
                      "Number of records in the **authors** table that have been **temporarily** or **permanently** deleted.",
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
      bookAuthorsUpdateSuccess: {
        type: "object",
        required: ["data"],
        properties: {
          data: {
            type: "object",
            required: ["booksAuthors", "error"],
            properties: {
              booksAuthors: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["createdAt", "bookId", "authorId"],
                      properties: {
                        createdAt: {
                          type: "string",
                          description: "Date of creation of the registry.",
                        },
                        bookId: {
                          type: "number",
                          description: "Id associated with the book.",
                        },
                        authorId: {
                          type: "number",
                          description: "Id associated with the author.",
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
                            "Description related to the error.<br>Return message error similar to `author with id '##' not found`.",
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
      bookAuthorsUpdateBadRequest: {
        type: "object",
        required: ["error"],
        properties: {
          error: {
            type: "object",
            required: ["status", "errors"],
            properties: {
              status: {
                type: "number",
                description: "Status code associated with the error.",
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
                        "Description related to the error.<br>Return message error similar to `author with id '##' not found`.",
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
