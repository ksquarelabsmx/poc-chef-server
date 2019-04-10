import { appErrors } from "../strategies";

export interface IAppErrorType {
  type: string;
}

export const orderNotFound = (): IAppErrorType => ({
  type: appErrors.ORDER_NOT_FOUND
});

export const orderAlreadyCancelled = (): IAppErrorType => ({
  type: appErrors.ORDER_ALREADY_CANCELLED
});
