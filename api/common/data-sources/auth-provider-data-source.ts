import * as fp from "lodash/fp";
import { v4 as uuid } from "uuid";

import { auth } from "../interfaces";

const authProviders: auth.IAuthProviderDao[] = [
  {
    id: uuid(),
    name: "google",
    createdAt: 1553016282,
    updatedAt: 1553016282
  },
  // This is from user password
  {
    id: uuid(),
    name: "custom",
    createdAt: 1553016282,
    updatedAt: 1553016282
  }
];

const findByName = (name: string): auth.IAuthProviderDao =>
  fp.find(
    (authProvider: auth.IAuthProviderDao) => authProvider.name === name,
    authProviders
  ) || authProviders[0];

export const authDataSource = {
  authProviders,
  findByName
};
