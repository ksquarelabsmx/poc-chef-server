import { IDomainValidationError, IError } from "../interfaces/error";
// TODO errors by namespace

const emailInUse: IDomainValidationError = {
  field: "email",
  error: "email already in use"
};

const userNotExist: IDomainValidationError = {
  field: "email",
  error: "invalid email"
};

const productNotExist: IDomainValidationError = {
  field: "products",
  error: "product doesn't exist"
};

const eventIsFinished: IDomainValidationError = {
  field: "expiration_date_time",
  error: "Event has already finished"
};

const eventIsCancelled: IDomainValidationError = {
  field: "cancelled",
  error: "Event has already cancelled"
};

const eventIsNotCancelled: IDomainValidationError = {
  field: "cancelled",
  error: "Event has not been cancelled"
};

const orderEventDifferent: IDomainValidationError = {
  field: "eventId",
  error: "Event cannot be change"
};

const orderIsCancelled: IDomainValidationError = {
  field: "cancelled",
  error: "Order has already cancelled"
};

const orderIsNotCancelled: IDomainValidationError = {
  field: "cancelled",
  error: "Order has not been cancelled"
};

const orderIsPaid: IDomainValidationError = {
  field: "paid",
  error: "Order has already paid"
};

const orderIsNotPaid: IDomainValidationError = {
  field: "paid",
  error: "Order has not been paid"
};

const invalidPassword: string = "invalid password";

const invalidAuthProvider: string = "invalid auth provider";

const noTokenPresent: IError = {
  title: "Unathorized",
  detail: "No Token Present",
  statusCode: 401
};

const malformedHeader: IError = {
  title: "Unathorized",
  detail: "Malformed header",
  statusCode: 401
};

const invalidAuthMethod: IError = {
  title: "Unathorized",
  detail: "Unexpected authorization method",
  statusCode: 401
};

const expiredToken: IError = {
  title: "Unathorized",
  detail: "expired token",
  statusCode: 401
};

const jwtInvalid: IError = {
  title: "JsonWebTokenError",
  detail: "invalid token",
  statusCode: 401
};

const tokenEarly: IError = {
  title: "Unathorized",
  detail: "token is early",
  statusCode: 401
};

const invalidAudencie: IError = {
  title: "Forbidden",
  detail: "token cannot be used in this domain",
  statusCode: 403
};

const invalidSubject: IError = {
  title: "Forbidden",
  detail: "token cannot be used for this request",
  statusCode: 403
};

const notRoleAuthorization: IError = {
  title: "Forbidden",
  detail: "Role without permissions",
  statusCode: 403
};

const notUserAuthorization: IError = {
  title: "Forbidden",
  detail: "User without permissions",
  statusCode: 403
};

export const authErrors = {
  noTokenPresent,
  malformedHeader,
  invalidAuthMethod,
  jwtInvalid,
  expiredToken,
  tokenEarly,
  invalidAudencie,
  invalidSubject,
  notRoleAuthorization,
  notUserAuthorization
};

export const error = {
  emailInUse,
  userNotExist,
  invalidPassword,
  invalidAuthProvider,
  productNotExist,
  orderEventDifferent,
  eventIsFinished,
  eventIsCancelled,
  eventIsNotCancelled,
  orderIsCancelled,
  orderIsNotCancelled,
  orderIsPaid,
  orderIsNotPaid
};
