export interface Book {
  title: string;
}

export interface CreateBookRequest {
  title: string;
  authors?: string[];
}
