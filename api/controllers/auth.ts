import chalk from "chalk";
import * as Debug from "debug";

import { uriBuilder } from "./../utils/uri";
import { response } from "./../utils/response";
import { ILogin } from "./../interfaces/auth";
import { authService } from "./../services/auth";
import { Response, Request, NextFunction } from "express";

const debug = Debug("chef:events:controller:auth");

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`AuthController: ${chalk.green("authenticate login")}`);

    const loginCredentials: ILogin = { ...req.body };
    // reject if credentials are invalid
    const userInfo = await authService.validateLogin(loginCredentials);
    const source: string = uriBuilder(req);

    return res.send(response.success(userInfo, 200, source));
  } catch (err) {
    debug(`login Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

export const authController = {
  login
};
