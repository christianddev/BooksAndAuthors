export interface ApiResponse<T> {
  data?: T;
  error?: T;
}

export interface ErrorResponse {
  code: number;
  message: string;
  errors?: string[] | object[];
}

export interface ErrorOperation {
  message: string;
}
