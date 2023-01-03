import { BaseModel } from "./api";

export interface BookRequest extends BaseModel {
  id?: number;
  isbn?: string;
  title?: string;
  isDeleted?: boolean;
  authors?: string[];
}
