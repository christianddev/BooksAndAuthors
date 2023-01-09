import dotenv from "dotenv";
import { Dialect } from "sequelize";

dotenv.config();

export const SERVER_PORT = (process.env.SERVER_PORT as string) ?? "";

export const DEVELOPMENT_SERVER =
  (process.env.DEVELOPMENT_SERVER as string) ?? "";

export const PRODUCTION_SERVER =
  (process.env.PRODUCTION_SERVER as string) ?? "";

export const EXCLUDE_ORM_FIELDS =
  process.env?.DATABASE_DEFAULT_EXCLUDE_ORM_FIELDS == "true";

export const TEMPORARY_DELETE =
  process.env?.DATABASE_DEFAULT_TEMPORARY_DELETED == "true";

export const EXCLUDE_TEMPORARY_DELETED =
  process.env?.DATABASE_DEFAULT_EXCLUDE_TEMPORARY_DELETED == "true";

export const DATABASE_NAME: string =
  (process?.env?.DATABASE_NAME as string) ?? "";

export const DATABASE_USER: string =
  (process?.env?.DATABASE_USER as string) ?? "";

export const DATABASE_PASSWORD: string =
  (process?.env?.DATABASE_PASSWORD as string) ?? "";

export const DATABASE_HOST: string =
  (process?.env?.DATABASE_HOST as string) ?? "";

export const DATABASE_PORT: string = process?.env?.DATABASE_PORT ?? "";

export const DATABASE_DIALECT: Dialect =
  (process?.env?.DATABASE_DIALECT as Dialect) ?? "mysql";

export const DATABASE_LOGGING: boolean =
  process?.env?.DATABASE_LOGGING == "true";

export const BOOK_ID_FIELD: string =
  (process?.env?.DATABASE_BOOK_AUTHORS_BOOK_ID as string) ?? "";

export const AUTHOR_ID_FIELD: string =
  (process?.env?.DATABASE_BOOK_AUTHORS_AUTHOR_ID as string) ?? "";

export const AUTHOR_MODEL_NAME: string =
  (process?.env?.DATABASE_AUTHORS_MODEL_NAME as string) ?? "";

export const BOOK_AUTHOR_MODEL_NAME: string =
  (process?.env?.DATABASE_BOOK_AUTHORS_MODEL_NAME as string) ?? "";

export const BOOK_MODEL_NAME: string =
  (process?.env?.DATABASE_BOOK_MODEL_NAME as string) ?? "";

// URL
export const BOOKS_PATH = `${(process?.env?.SERVER_BASE_URL as string) ?? ""}${
  (process?.env?.SERVER_API_VERSION_URL as string) ?? ""
}${(process?.env?.SERVER_URL_BOOKS as string) ?? ""}`;

export const AUTHORS_PATH = `${
  (process?.env?.SERVER_BASE_URL as string) ?? ""
}${(process?.env?.SERVER_API_VERSION_URL as string) ?? ""}${
  (process?.env?.SERVER_URL_AUTHORS as string) ?? ""
}`;

export const DOCUMENTATION_PATH = `${
  (process?.env?.SERVER_BASE_URL as string) ?? ""
}${(process?.env?.SERVER_API_VERSION_URL as string) ?? ""}${
  (process?.env?.SERVER_DOCUMENTATION_URL as string) ?? ""
}`;

export const SEQUELIZE_FIELDS = ["isDeleted", "createdAt", "updatedAt"];

console.log('process?.env?.NODE_ENV', process?.env?.NODE_ENV)