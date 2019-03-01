interface IErrorWithStack {
  stack?: any;
  statusCode: number;
  error: string;
  message: string;
}

interface IBadRequest {
  stack?: any;
  status: number;
  errors: any;
  message: string;
}

export function badRequestFormated(payload: IErrorWithStack): IBadRequest {
  const { statusCode, error, message, stack } = payload;

  // only return this in development and test mode
  if (stack)
    return {
      status: statusCode,
      message: error,
      errors: JSON.parse(message),
      stack
    };

  // return this in production mode
  return {
    status: statusCode,
    message: error,
    errors: JSON.parse(message)
  };
}
