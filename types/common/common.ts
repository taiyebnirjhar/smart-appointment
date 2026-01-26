/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export interface IGenericSuccessResponse<T = any> {
  success: boolean;
  data: T;
  meta?: IMeta;
  message: string;
}

export interface IGenericErrorMessage {
  path?: string | number;
  code?: string;
  message: string;
}

export interface IGenericErrorResponse<T = any> {
  success: boolean;
  error: IGenericErrorMessage;
}

export interface IQueryFeatures {
  page?: number | string;
  limit?: number | string;
  fields?: string;
  populate?: string;
  sort?: string;
  search?: string;
}

export type IQuery = IQueryFeatures & { [key: string]: any };

export interface TokenPayload {
  userId: string;
  orgId: string;
  name: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface IBase {
  _id?: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}
