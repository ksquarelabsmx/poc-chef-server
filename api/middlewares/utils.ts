interface IErrorWithStack {
  stack?: any;
  statusCode: number;
  error: string;
  message: string;
}

interface IBadRequest {
  message: string;
  status: number;
  stack?: any;
  errors?: any;
  reason?: string;
}

function badRequestStrategy(payload: IErrorWithStack): IBadRequest {
  const { statusCode, error, message, stack } = payload;
  console.log(message);
  // only return this in development and test mode
  if (stack) {
    switch (message) {
      case "Event has already finished":
        return {
          status: statusCode,
          message: error,
          reason: message,
          stack
        };
      // used to show errors in Request Validation Middleware
      default:
        return {
          status: statusCode,
          message: error,
          errors: JSON.parse(message),
          stack
        };
    }
  }

  switch (message) {
    case "Event has already finished":
      return {
        status: statusCode,
        message: error,
        reason: message
      };
    // used to show errors in Request Validation Middleware
    default:
      return {
        status: statusCode,
        message: error,
        errors: JSON.parse(message)
      };
  }
}

export function badRequestFormated(payload: IErrorWithStack): IBadRequest {
  return badRequestStrategy(payload);
}
