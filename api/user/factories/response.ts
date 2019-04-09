export interface IErrorResponse {
  ok: boolean;
  status: string;
  message: string;
  reason?: string;
}

export const badRequest = (reason: string): IErrorResponse => ({
  ok: false,
  status: "400",
  message: "Bad Request",
  reason: reason
});

export const notFound = (): IErrorResponse => ({
  ok: false,
  status: "404",
  message: "Not Found"
});

export const internalServerError = (): IErrorResponse => ({
  ok: false,
  status: "500",
  message: "Internal Server Error"
});
