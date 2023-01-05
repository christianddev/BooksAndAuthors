import type { Model } from "sequelize";

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
  status?: number;
  message?: string;
  errors?: string[] | object[];
}

export interface BaseModel {
  id?: number;
  isDeleted?: boolean;
}
