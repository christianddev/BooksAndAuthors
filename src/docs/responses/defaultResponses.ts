import type { OAS3Definition } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "",
  info: {
    title: "",
    version: "",
  },
  components: {
    responses: {
      internalServerError: {
        description:
          "Internal Server Error, you should contact the administrator or check the logs",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/internalServerError",
            },
          },
        },
      },
      badRequest: {
        description: "Bad Request, Error related to the request data",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/internalServerError",
            },
          },
        },
      },
      notFound: {
        description: "Not Found, Error related to the request data.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/internalServerError",
            },
          },
        },
      },
    },
  },
};

export default swaggerDefinition?.components?.responses;
