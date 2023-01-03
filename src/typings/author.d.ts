import { BaseModel } from "./api";

export interface AuthorRequest extends BaseModel {
  name?: string;
  country?: string;
  books?: number[];
}
