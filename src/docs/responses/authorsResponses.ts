import type { OAS3Definition } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "",
  info: {
    title: "",
    version: "",
  },
  components: {
    responses: {
      postAuthor: {
        description:
          "Returns the information of an author, taking into account the setting of environment variables `EXCLUDE_ORM_FIELDS`.",
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
      postAuthorBadRequest: {
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
      postAuthorsWithBooks: {
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
      postAuthorWithBooksBadRequest: {
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
      getAuthors: {
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
      getAuthor: {
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
      getAuthorsAndHisBooks: {
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
      patchAuthor: {
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
      patchAuthorBadRequest: {
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
      patchAuthorBooks: {
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
      patchAuthorBookBadRequest: {
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
      deletedAuthor: {
        description: "Delete a record temporarily.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/authorDeleted",
            },
          },
        },
      },
    },
  },
};

export default swaggerDefinition?.components?.responses;
