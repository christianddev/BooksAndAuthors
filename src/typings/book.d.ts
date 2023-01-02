export interface Book {
  title: string;
}

export interface CreateBookRequest {
  isbn: string;
  title: string;
  authors?: string[];
}
