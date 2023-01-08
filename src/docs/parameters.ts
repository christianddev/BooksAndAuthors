import type { OAS3Definition } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "",
  info: {
    title: "",
    version: "",
  },
  components: {
    parameters: {
      id: {
        name: "id",
        in: "path",
        description: "ID of the item to retrieve",
        required: true,
        schema: {
          type: "number",
        },
      },
    },
  },
};

export default swaggerDefinition?.components?.parameters;
