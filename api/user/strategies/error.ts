import { IAppErrorType } from "../factories/error";
import { responseFactory } from "../factories/";
import { appErrors } from "./index";

export const handle = (error: IAppErrorType) => {
  if (error.type === appErrors.ORDER_NOT_FOUND) {
    return responseFactory.notFound();
  }

  if (error.type === appErrors.ORDER_ALREADY_CANCELLED) {
    return responseFactory.badRequest("Order Already Cancelled");
  }

  return responseFactory.internalServerError();
};
