import chalk from "chalk";
import * as Debug from "debug";

import { authService } from "../services";

const debug = Debug("chef:events:controller:auth");

// This is used by partner/ admin partner
const login = async loginCredentials => {
  debug(`AuthController: ${chalk.green("authenticate login")}`);
  return authService.validateLogin(loginCredentials);
};

export const authController = {
  login
};
