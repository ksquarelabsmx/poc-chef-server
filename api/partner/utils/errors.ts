import { IDomainValidationError, IError } from "./../interfaces/error";
// TODO errors by namespace

const emailInUse: IDomainValidationError = {
  field: "email",
  error: "email already in use"
};

const userNotExist: IDomainValidationError = {
  field: "email",
  error: "invalid email"
};

const eventNotExist: IDomainValidationError = {
  field: "event_id",
  error: "event doesn't exist"
};

const eventIsFinished: IDomainValidationError = {
  field: "finished",
  error: "Event has already finished"
};

const orderEventDifferent: IDomainValidationError = {
  field: "eventId",
  error: "Event cannot be change"
};

const orderIsCancelled: IDomainValidationError = {
  field: "cancelled",
  error: "Order has already cancelled"
};

const orderIsPaid: IDomainValidationError = {
  field: "paid",
  error: "Order has already paid"
};

const invalidPassword: string = "invalid password";

const invalidAuthProvider: string = "invalid auth provider";

const noTokenPresent: IError = {
  title: "Unathorized",
  detail: "No Token Present",
  status: 401
};

const malformedHeader: IError = {
  title: "Unathorized",
  detail: "Malformed header",
  status: 401
};

const invalidAuthMethod: IError = {
  title: "Unathorized",
  detail: "Unexpected authorization method",
  status: 401
};

const expiredToken: IError = {
  title: "Unathorized",
  detail: "expired token",
  status: 401
};

const jwtInvalid: IError = {
  title: "JsonWebTokenError",
  detail: "invalid token",
  status: 401
};

const tokenEarly: IError = {
  title: "Unathorized",
  detail: "token is early",
  status: 401
};

const invalidAudencie: IError = {
  title: "Forbidden",
  detail: "token cannot be used in this domain",
  status: 403
};

const invalidSubject: IError = {
  title: "Forbidden",
  detail: "token cannot be used for this request",
  status: 403
};

const notRoleAuthorization: IError = {
  title: "Forbidden",
  detail: "Role without permissions",
  status: 403
};

const notUserAuthorization: IError = {
  title: "Forbidden",
  detail: "User without permissions",
  status: 403
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
  eventNotExist,
  orderEventDifferent,
  eventIsFinished,
  orderIsCancelled,
  orderIsPaid
};
