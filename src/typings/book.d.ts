export interface BookRequest {
  id?: string
  isbn: string;
  title: string;
  authors?: string[];
}
