import * as fp from "lodash/fp";
import * as moment from "moment";
import { v4 as uuid } from "uuid";

import { user } from "./../interfaces";

const users: user.IUserDao[] = [
  {
    id: "6d623d08-113c-4565-81b2-e17c90331241",
    name: "Maik",
    email: "maik@fakegmail.com",
    password: "plainpassword",
    role: "partner",
    authProviderId: uuid(),
    createdAt: moment()
      .utc()
      .unix(),
    updatedAt: moment()
      .utc()
      .unix()
  }
];

const save = (user: user.IUser): user.IUserDao => {
  const userDao: user.IUserDao = {
    id: uuid(),
    ...user,
    createdAt: moment()
      .utc()
      .unix(),
    updatedAt: moment()
      .utc()
      .unix()
  };

  users.push(userDao);
  return userDao;
};

const findByEmail = (email: string): user.IUserDao | undefined =>
  fp.find((user: user.IUserDao) => user.email === email, users);

export const usersDataSource = { save, findByEmail };
