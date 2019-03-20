import * as fp from "lodash/fp";

import { v4 as uuid } from "uuid";
import { IAuthProviderDao } from "./../interfaces/auth";

const authProviders: IAuthProviderDao[] = [
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

const findByName = (name: string): IAuthProviderDao | undefined =>
  fp.find(
    (authProvider: IAuthProviderDao) => authProvider.name === name,
    authProviders
  );

export const authDataSource = {
  authProviders,
  findByName
};
