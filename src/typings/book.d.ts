import { Author } from "./author";

export interface Book {
  title: string;
}

export interface CreateBook {
  title: string;
  authors?: Author[];
}
