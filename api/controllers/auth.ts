import chalk from "chalk";
import * as Debug from "debug";
import { Response, Request, NextFunction } from "express";

import { auth } from "./../interfaces";
import { uriBuilder, response } from "./../utils";
import { authRepository } from "./../repository";

const debug = Debug("chef:events:controller:auth");

// This is used by partner/ admin partner
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`AuthController: ${chalk.green("authenticate login")}`);

    const loginCredentials: auth.ILogin = { ...req.body };
    // reject if credentials are invalid
    const userInfo = await authRepository.validateLogin(loginCredentials);
    const source: string = uriBuilder(req);

    return res.send(response.success(userInfo, 200, source));
  } catch (err) {
    debug(`login Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`AuthController: ${chalk.green("authenticate googleLogin")}`);

    const { idToken } = req.body;
    const source: string = uriBuilder(req);
    const userInfo = await authRepository.googleLogin(idToken);

    return res.send(response.success(userInfo, 200, source));
  } catch (err) {
    debug(`googleLogin Controller Error: ${chalk.red(err)}`);
    next(err);
  }
};

export const authController = {
  login,
  googleLogin
};
