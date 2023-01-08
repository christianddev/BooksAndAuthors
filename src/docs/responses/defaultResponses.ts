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
            example: {
              error: {
                status: 500,
                message: "Contact with the administrator",
              },
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
            example: {
              error: {
                status: 400,
                message: "Message related to the error",
              },
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
            example: {
              error: {
                status: 404,
                message:
                  "Message related with the data of the request or the resource you are trying to access",
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerDefinition?.components?.responses;
