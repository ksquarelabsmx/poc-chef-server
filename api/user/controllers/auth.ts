import chalk from "chalk";
import * as Debug from "debug";

import { authService } from "../services";

const debug = Debug("chef:events:controller:auth");

const googleLogin = async (id: string): Promise<any> => {
  debug(`AuthController: ${chalk.green("authenticate googleLogin")}`);
  return authService.googleLogin(id);
};

export const authController = {
  googleLogin
};
