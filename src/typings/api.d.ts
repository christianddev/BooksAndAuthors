import type { Model } from "sequelize";

export interface ApiResponse<T> {
  data?: T;
  error?: T;
}

export interface ErrorResponse {
  code: number;
  message: string;
  errors?: string[] | object[];
}

export interface ResponseOperation<T = Model<any, any>> {
  data?: T;
  error?: ErrorOperation;
}

export interface ErrorOperation {
  message?: string;
}
