import type { OAS3Definition } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "",
  info: {
    title: "",
    version: "",
  },
  components: {
    responses: {
      postBook: {
        description:
          "Returns the information of an book.<br><br>Taking into account the setting of environment variables `EXCLUDE_ORM_FIELDS`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/book",
            },
            examples: {
              author: {
                $ref: "#/components/examples/book",
              },
            },
          },
        },
        links: {
          bookId: { $ref: "#/components/links/bookId" },
        },
      },
      postBookBadRequest: {
        description:
          "Bad Request, Error related to the request data.<br><br>**isbn** and **title** fields must not be null, if you do not send some of these fields, an error similar to `check **####** field` will be returned.<br><br>If the **isbn** is in use in the database, it returns an error message similar to:<br>`a book exists with the isbn '####', id '##' & title '###'`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/bookBadRequest",
            },
            examples: {
              isbnField: {
                $ref: "#/components/examples/isbnField",
              },
              titleField: {
                $ref: "#/components/examples/titleField",
              },
              booksExists: {
                $ref: "#/components/examples/booksExists",
              },
            },
          },
        },
      },
      postBookWithAuthors: {
        description:
          "Returns the information of the new record in the field **book**.<br><br>In the **booksAuthors** field it returns information related to the association between the author and his books, in case some of the books are not available, an error message will be sent.<br><br>The response of this endpoint takes into account the setting of environment variables `EXCLUDE_ORM_FIELDS`, `TEMPORARY_DELETE`, `TEMPORARY_DELETE` and `EXCLUDE_TEMPORARY_DELETED`.<br><br>If the **isbn** is in use in the database, it returns an error message similar to:<br>`a book exists with the isbn '####', id '##' & title '###'`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/booksWithAuthors",
            },
            examples: {
              postBooksWithAuthors: {
                $ref: "#/components/examples/postBooksWithAuthors",
              },
              postBookWithAuthorsSomeErrors: {
                $ref: "#/components/examples/postBookWithAuthorsSomeErrors",
              },
            },
          },
        },
        links: {
          bookId: { $ref: "#/components/links/bookId" },
        },
      },
      postBookWithAuthorsBadRequest: {
        description:
          "Bad Request, Error related to the request data, **isbn**, **title** and **authors** fields must not be null.<br><br>If you do not send some of these fields, an error similar to `check **####** field` will be returned.<br><br>If the **isbn** is in use in the database, it returns an error message similar to:<br>`a book exists with the isbn '####', id '##' & title '###'`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/internalServerError",
            },
            examples: {
              isbnField: {
                $ref: "#/components/examples/isbnField",
              },
              titleField: {
                $ref: "#/components/examples/titleField",
              },
              booksExists: {
                $ref: "#/components/examples/booksExists",
              },
            },
          },
        },
      },
      getBooks: {
        description:
          "Returns a list of books.<br><br>Taking into account the setting of environment variables `EXCLUDE_ORM_FIELDS`, `TEMPORARY_DELETE` and `EXCLUDE_TEMPORARY_DELETED`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/getBooks",
            },
            examples: {
              authorsList: {
                $ref: "#/components/examples/booksList",
              },
            },
          },
        },
      },
      getBook: {
        description:
          "Returns the information of an book.<br><br>Taking into account the setting of environment variables `EXCLUDE_ORM_FIELDS`, `TEMPORARY_DELETE` and `EXCLUDE_TEMPORARY_DELETED`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/book",
            },
            examples: {
              author: {
                $ref: "#/components/examples/book",
              },
            },
          },
        },
      },
      bookNotFound: {
        description:
          "Not Found, The requested resource is not found, a **book** cannot be found for two reasons:<br><br> - There is no record related to the request ID.<br><br> - Taking into account the setting of the environment variables `TEMPORARY_DELETE` and `EXCLUDE_TEMPORARY_DELETED`, the record may exist in the database, but is not available if the value of the **isDeleted** field is set to **true**.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/internalServerError",
            },
            examples: {
              authorNotFound: {
                $ref: "#/components/examples/bookNotFound",
              },
            },
          },
        },
      },
      getBooksAndHisAuthors: {
        description:
          "Returns the books' information.<br><br>Taking into account the setting of environment variables `EXCLUDE_ORM_FIELDS`, `TEMPORARY_DELETE` and `EXCLUDE_TEMPORARY_DELETED`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/booksAndHisAuthors",
            },
            examples: {
              authorsAndHisBooks: {
                $ref: "#/components/examples/booksAndHisAuthorsList",
              },
            },
          },
        },
      },
      patchBook: {
        description:
          "Update the book's **isbn** or **title**,<br><br>Taking into account the setting of environment variables  `TEMPORARY_DELETE` and `EXCLUDE_TEMPORARY_DELETED`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/bookUpdate",
            },
          },
        },
      },
      patchBookBadRequest: {
        description:
          "Bad Request, Error related to the request data, **isbn** and **title** fields must not be null,<br><br>If the **isbn** is in use in the database, it returns an error message similar to:<br>`a book exists with the isbn '####', id '##' & title '###'`.<br><br>If both fields are not sent, it will return an error message similar to `check 'isbn' & 'title' field`.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/internalServerError",
            },
            examples: {
              isbnField: {
                $ref: "#/components/examples/isbnField",
              },
              titleField: {
                $ref: "#/components/examples/titleField",
              },
              booksExists: {
                $ref: "#/components/examples/booksExists",
              },
            },
          },
        },
      },
      patchBookAuthors: {
        description:
          "Updates the register of authors associated with an book, taking into account the setting of environment variables `TEMPORARY_DELETE` and `EXCLUDE_TEMPORARY_DELETED`.<br><br>**At least one of the book-authors partnerships has been completed successfully**.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/bookAuthorsUpdateSuccess",
            },
            examples: {
              patchBookWithAuthorsSomeErrors: {
                $ref: "#/components/examples/patchBookWithAuthorsSomeErrors",
              },
            },
          },
        },
      },
      patchBookAuthorBadRequest: {
        description:
          "Bad Request.<br>If the record associated to an ID does not exist or the `TEMPORARY_DELETE` and `EXCLUDE_TEMPORARY_DELETED` configuration has been set and the record is defined as **isDeleted**, a message similar to `book with id '##' not found` is returned.<br><br> If the relationship between the author and the book has been made previously, an error message is returned similar to `there is an author with the bookId '##' & authorId '##'`.<br><br>**All associations between book and author have returned some type of error.**",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/bookAuthorsUpdateBadRequest",
            },
            examples: {
              bookAuthorsErrors: {
                $ref: "#/components/examples/bookAuthorsErrors",
              },
            },
          },
        },
      },
      deletedBook: {
        description: "Delete a record temporarily.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/authorDeleted",
            },
            examples: {
              booksAuthorsUpdatedRows: {
                $ref: "#/components/examples/booksAuthorsUpdatedRows",
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerDefinition?.components?.responses;
