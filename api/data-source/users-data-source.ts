import * as fp from "lodash/fp";
import * as moment from "moment";
import { v4 as uuid } from "uuid";

import { IUserDao, IUser } from "./../interfaces/user";

const users: IUserDao[] = [
  {
    id: uuid(),
    name: "Maik",
    email: "maik@fakegmail.com",
    password: "plainpassword",
    role: "partner",
    createdAt: moment()
      .utc()
      .unix(),
    updatedAt: moment()
      .utc()
      .unix()
  }
];

const save = (user: IUser): IUserDao => {
  const userDao: IUserDao = {
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

const findByEmail = (email: string): IUserDao | undefined =>
  fp.find((user: IUserDao) => user.email === email, users);

export const usersDataSource = { save, findByEmail };
