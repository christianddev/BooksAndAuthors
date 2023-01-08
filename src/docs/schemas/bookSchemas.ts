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
                        "Assigned by the database, is used to identify the ledger in database queries",
                    },
                    isbn: {
                      type: "string",
                      description:
                        "Book's isbn, in combination with the **title** field, is used to identify an book, the **isbn** & **title** fields must be unique.",
                    },
                    title: {
                      type: "string",
                      description:
                        "Books's title, in combination with the **isbn** field, is used to identify an book, the **isbn** & **title** fields must be unique.",
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
