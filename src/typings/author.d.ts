import { Book } from "./book";

export interface Author {
  name: string;
  country: string;
}

export interface CreateAuthor {
  name: string;
  country: string;
  books: CreateBook[];
}
