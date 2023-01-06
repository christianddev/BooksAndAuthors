import swaggerJSDoc from "swagger-jsdoc";

import type { OAS3Definition, OAS3Options } from "swagger-jsdoc";

import { SERVER_PORT } from "../helpers";

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
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        // TODO: check this
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      book: {
        type: "object",
        required: ["isbn", "title"],
        properties: {
          id: {
            type: "string",
          },
          isbn: {
            type: "string",
          },
          title: {
            type: "string",
          },
        },
      },
      author: {
        type: "object",
        required: ["name", "country"],
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          country: {
            type: "string",
          },
        },
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/v1/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);
