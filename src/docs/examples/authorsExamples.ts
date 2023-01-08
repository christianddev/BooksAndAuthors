import type { OAS3Definition } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "",
  info: {
    title: "",
    version: "",
  },
  components: {
    examples: {
      nameField: {
        summary: "Name field validation",
        description: "The **name** field is required.",
        value: {
          error: {
            status: 400,
            message: "check 'name' field",
          },
        },
      },
      countryField: {
        summary: "Country field validation",
        description: "The **country** field is required.",
        value: {
          error: {
            status: 400,
            message: "check 'country' field",
          },
        },
      },
      authorsExists: {
        summary: "Authors exists",
        description:
          "The combination of **name** and **country** must be unique.",
        value: {
          error: {
            status: 400,
            message: "a authors exists with the name '##' & country '###'",
          },
        },
      },
      authorNotFound: {
        summary: "Author not found",
        description: "Resource not found.",
        value: {
          error: {
            status: 404,
            message: "author with id '###' not found",
          },
        },
      },
      author: {
        summary: "Author",
        description: "",
        value: {
          data: {
            author: {
              id: 1,
              name: "Patrick Rothfuss",
              country: "USA",
            },
          },
        },
      },
      authorsList: {
        summary: "List of authors",
        description: "",
        value: {
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
      authorsAndHisBooksList: {
        summary: "List of authors and their books",
        description: "Some authors may not have associated books.",
        value: {
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

              {
                id: 3,
                name: "Paul Kearney",
                country: "GB-NIR",
                books: [],
              },
            ],
          },
        },
      },
      postAuthorWithBooks: {
        summary: "Author with books",
        description:
          "Data of the created record and the result of the association in the **booksauthors** table.",
        value: {
          data: {
            author: {
              id: 1,
              name: "Patrick Rothfuss",
              country: "USA",
            },
            booksAuthors: {
              data: [
                {
                  createdAt: "2023-01-08T13:42:27.338Z",
                  bookId: 1,
                  authorId: 1,
                },
              ],
              error: [],
            },
          },
        },
      },
      postAuthorWithBooksSomeErrors: {
        summary: "Author with books and errors",
        description:
          "The result of the associations in the **booksauthors** table and the errors when trying to make associations with the **booksauthors** table.",
        value: {
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
      authorBooksErrors: {
        summary: "Errors when associating books",
        description:
          "The association between authors and books may return different error messages.",
        value: {
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
      booksAuthorsUpdatedRows: {
        summary: "Affected rows",
        description:
          "fields:<br><br>**deletedBooksAuthors**: number of author associations and books that have been permanently deleted from the **booksauthors** table.<br><br>**deletedAuthor**: number of records in the *authors* table that have been **temporarily** or **permanently** deleted.",
        value: {
          data: {
            affectedRows: {
              deletedBooksAuthors: 5,
              deletedBook: [1],
            },
          },
        },
      },

      patchAuthorWithBooksSomeErrors: {
        summary: "Author with books and errors",
        description:
          "The result of the associations in the **booksauthors** table and the errors when trying to make associations with the **booksauthors** table.",
        value: {
          data: {
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
    },
  },
};

export default swaggerDefinition?.components?.examples;
