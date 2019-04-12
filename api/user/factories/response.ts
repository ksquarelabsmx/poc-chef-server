export interface IErrorResponse {
  ok: boolean;
  statusCode: string;
  message: string;
  reason?: string;
}

export const badRequest = (reason: string): IErrorResponse => ({
  ok: false,
  statusCode: "400",
  message: "Bad Request",
  reason: reason
});

export const notFound = (): IErrorResponse => ({
  ok: false,
  statusCode: "404",
  message: "Not Found"
});

export const internalServerError = (): IErrorResponse => ({
  ok: false,
  statusCode: "500",
  message: "Internal Server Error"
});
