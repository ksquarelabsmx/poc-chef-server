import chalk from "chalk";
import * as Debug from "debug";
import { Response, Request, NextFunction } from "express";

import { uriBuilder } from "../utils";
import { response } from "../utils";
import { user } from "../interfaces";
import { userMapper } from "./../mappers";
import { userRepository } from "./../repository";

const debug = Debug("chef:events:controller:user");

const registerPartner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(`EventController: ${chalk.green("creating user")}`);
  try {
    const source: string = uriBuilder(req);
    const user: user.IUser = { ...req.body };

    const createdUser = await userRepository.registerPartner(user);
    const userDto: user.IUserDto = userMapper.toDto(createdUser);

    res.send(response.success(userDto, 201, source));
  } catch (err) {
    debug(`createUser Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const userController = {
  registerPartner
};

export { userController };
