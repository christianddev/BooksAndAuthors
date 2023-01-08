import type { OAS3Definition } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "",
  info: {
    title: "",
    version: "",
  },
  components: {
    examples: {
      isbnField: {
        summary: "ISBN field validation",
        description: "The **isbn** field is required.",
        value: {
          error: {
            status: 400,
            message: "check 'isbn' field",
          },
        },
      },
      titleField: {
        summary: "Title field validation",
        description: "The **title** field is required.",
        value: {
          error: {
            status: 400,
            message: "check 'title' field",
          },
        },
      },
      booksExists: {
        summary: "Books exists",
        description: "The **isbn** must be unique.",
        value: {
          error: {
            status: 400,
            message: "a book exists with the isbn '###', id '##' & title '###'",
          },
        },
      },
      bookNotFound: {
        summary: "Book not found",
        description: "Resource not found.",
        value: {
          error: {
            status: 404,
            message: "book with id '###' not found",
          },
        },
      },
      book: {
        summary: "Book",
        description: "",
        value: {
          data: {
            book: {
              id: 1,
              isbn: "978-0-7564-0407-9",
              title: "The Name of the Wind, 2007",
            },
          },
        },
      },
      booksList: {
        summary: "List of books",
        description: "",
        value: {
          data: {
            books: [
              {
                id: 1,
                isbn: "978-0-7564-0407-9",
                title: "The Name of the Wind, 2007",
              },
              {
                id: 2,
                isbn: "9788408234494",
                title: "YO, JULIA",
              },
            ],
          },
        },
      },
      booksAndHisAuthorsList: {
        summary: "List of books and their authors",
        description: "Some books may not have associated authors.",
        value: {
          data: {
            booksAuthors: [
              {
                id: 1,
                isbn: "978-0-7564-0407-9",
                title: "The Name of the Wind, 2007",
                authors: [
                  {
                    id: 1,
                    name: "Patrick Rothfuss",
                    country: "USA",
                    booksauthors: {
                      bookId: 1,
                      authorId: 1,
                    },
                  },
                ],
              },
              {
                id: 2,
                isbn: "9788408234494",
                title: "YO, JULIA",
                authors: [
                  {
                    id: 2,
                    name: "Santiago Posteguillo",
                    country: "ESP",
                    booksauthors: {
                      bookId: 2,
                      authorId: 2,
                    },
                  },
                ],
              },
              {
                id: 3,
                isbn: "Las legiones malditas ",
                title: "978-84-666-3768-8",
                authors: [
                  {
                    id: 2,
                    name: "Santiago Posteguillo",
                    country: "ESP",
                    booksauthors: {
                      bookId: 3,
                      authorId: 2,
                    },
                  },
                ],
              },
              {
                id: 4,
                name: "Los diez mil",
                country: "978-84-9889-084-6",
                authors: [],
              },
            ],
          },
        },
      },
      postBooksWithAuthors: {
        summary: "Books with authors",
        description:
          "Data of the created record and the result of the association in the **booksauthors** table.",
        value: {
          data: {
            book: {
              id: 1,
              isbn: "978-0-7564-0407-9",
              title: "The Name of the Wind, 2007",
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
      postBookWithAuthorsSomeErrors: {
        summary: "Book with authors and errors",
        description:
          "The result of the associations in the **booksauthors** table and the errors when trying to make associations with the **booksauthors** table.",
        value: {
          data: {
            author: {
              id: 1,
              isbn: "978-0-7564-0407-9",
              title: "The Name of the Wind, 2007",
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
                  message: "author with id '##' not found",
                },
                {
                  message: "author with id '##' not found",
                },
              ],
            },
          },
        },
      },
      bookAuthorsErrors: {
        summary: "Errors when associating authors",
        description:
          "The association between books and authors may return different error messages.",
        value: {
          error: {
            status: 400,
            errors: [
              {
                message:
                  "there is an author with the bookId '1' & authorId '1'",
              },
              {
                message: "author with id '1' not found",
              },
            ],
          },
        },
      },
      booksAuthorsUpdatedRows: {
        summary: "Affected rows",
        description:
          "fields:<br><br>**deletedBooksAuthors**: number of associations between books and authors that have been **permanently** deleted from the **booksauthors** table.<br><br>**deletedBook**: number of records in the **books** table that have been **temporarily** or **permanently** deleted.",
        value: {
          data: {
            affectedRows: {
              deletedBooksAuthors: 5,
              deletedBook: [1],
            },
          },
        },
      },
      patchBookWithAuthorsSomeErrors: {
        summary: "Book with authors and errors",
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
                  message: "author with id '##' not found",
                },
                {
                  message: "author with id '##' not found",
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
