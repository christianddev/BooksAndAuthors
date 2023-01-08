import type { OAS3Definition } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "",
  info: {
    title: "",
    version: "",
  },
  components: {
    schemas: {
      internalServerError: {
        type: "object",
        required: ["error"],
        properties: {
          error: {
            type: "object",
            description: "Contains information related to one or more errors.",
            properties: {
              status: {
                type: "number",
                description: "Status code associated with the error.",
              },
              message: {
                type: "string",
                description: "Description related to the error.",
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerDefinition?.components?.schemas;
