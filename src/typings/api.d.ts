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

export interface OperationResponse<D = Model<any, any>, E = ErrorOperation> {
  data?: D;
  error?: E;
}

export interface ErrorOperation {
  message?: string;
}

export interface BaseModel {
  id?: number;
  isDeleted?: boolean;
}
