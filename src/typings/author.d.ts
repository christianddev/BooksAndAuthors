import { Book } from "./book";

export interface Author {
  id?: number
  name: string;
  country: string;
}

export interface CreateAuthorRequest {
  name: string;
  country: string;
  books?: CreateBook[];
}
