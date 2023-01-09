import swaggerJSDoc from "swagger-jsdoc";

import type { OAS3Definition, OAS3Options } from "swagger-jsdoc";

import links from "./common/links";
import parameters from "./common/parameters";
import defaultSchemas from "./schemas/defaultSchemas";
import authorSchemas from "./schemas/authorSchemas";
import bookSchemas from "./schemas/bookSchemas";
import authorsExamples from "./examples/authorsExamples";
import bookExamples from "./examples/bookExamples";
import defaultResponses from "./responses/defaultResponses";
import authorsResponses from "./responses/authorsResponses";
import booksResponses from "./responses/booksResponses";

import { DEVELOPMENT_SERVER, PRODUCTION_SERVER, SERVER_PORT } from "../utils";

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
    {
      url: `${DEVELOPMENT_SERVER}`,
    },
    {
      url: `${PRODUCTION_SERVER}`,
    },
  ],
  components: {
    securitySchemes: {
      jwtAuth: {
        // TODO: check this
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: { ...defaultSchemas, ...authorSchemas, ...bookSchemas },
    parameters,
    responses: { ...defaultResponses, ...authorsResponses, ...booksResponses },
    links,
    examples: { ...authorsExamples, ...bookExamples },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes/v1/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);
