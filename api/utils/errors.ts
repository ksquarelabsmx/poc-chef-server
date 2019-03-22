import { IDomainValidationError } from "./../interfaces/error";

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

const invalidPassword = "invalid password";

const invalidAuthProvider = "invalid auth provider";

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
