import type { OAS3Definition } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "",
  info: {
    title: "",
    version: "",
  },
  components: {
    examples: {
      nameFIeld: {
        summary: "Name field validation",
        description: "the **name** field is required.",
        value: {
          error: {
            status: 400,
            message: "check 'name' field",
          },
        },
      },
      countryField: {
        summary: "Country field validation",
        description: "the **country** field is required.",
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
        description: "resource not found",
        value: {
          error: {
            status: 404,
            message: "author with id '211' not found",
          },
        },
      },
      authorsAndHisBooks: {
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
    },
  },
};

export default swaggerDefinition?.components?.examples;
