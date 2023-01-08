import type { OAS3Definition } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "",
  info: {
    title: "",
    version: "",
  },
  components: {
    links: {
      authorId: {
        operationId: "getAuthor",
        description:
          "The `id` value returned in the response can be used as the Id parameter in:<br><br> - `GET`<br>api/v1/authors/{id}<br> - `PATCH`<br>api/v1/authors/{id}<br> - `PATCH`<br>api/v1/authors/{id}/books<br> - `DELETE`<br>api/v1/authors/{id}.",
        parameters: {
          id: "$request.path.id",
        },
      },
    },
  },
};

export default swaggerDefinition?.components?.links;
