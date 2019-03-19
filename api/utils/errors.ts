const emailInUse = `{
  "field": "email",
  "error": "email already in use"
}`;

const userNotExist = `{
  "field": "email",
  "error": "invalid email"
}`;

const invalidPassword = "invalid password";

export const error = {
  emailInUse,
  userNotExist,
  invalidPassword
};
