export interface IDomainValidationError {
  field: string;
  error: string;
}

export interface IErrorWithStack {
  stack?: any;
  statusCode: number;
  error: string;
  message: string;
}

export interface IBadRequest {
  message: string;
  statusCode: number;
  stack?: any;
  errors?: IDomainValidationError;
  reason?: string;
}

export interface IError {
  title: string;
  detail: string;
  statusCode: number;
}
