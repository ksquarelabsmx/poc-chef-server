import { error } from "./../interfaces";

const badRequestStrategy = (
  payload: error.IErrorWithStack
): error.IBadRequest => {
  const { statusCode, error, message, stack } = payload;
  // only return this in development and test mode
  if (stack) {
    // used to show errors in Request Validation Middleware
    return {
      status: statusCode,
      message: error,
      errors: JSON.parse(message),
      stack
    };
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
};

export const badRequestFormated = (
  payload: error.IErrorWithStack
): error.IBadRequest => {
  return badRequestStrategy(payload);
};
