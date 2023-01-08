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
    },
  },
};

export default swaggerDefinition?.components?.schemas;
