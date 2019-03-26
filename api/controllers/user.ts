import chalk from "chalk";
import * as Debug from "debug";
import { Response, Request, NextFunction } from "express";

import { uriBuilder } from "../utils/uri";
import { response } from "../utils/response";
import { IUser, IUserDto } from "../interfaces/user";
import { userService } from "../services";
import { userMapper } from "./../mappers";

const debug = Debug("chef:events:controller:user");

const registerPartner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(`EventController: ${chalk.green("creating user")}`);
  try {
    const source: string = uriBuilder(req);
    const user: IUser = { ...req.body };

    const createdUser = await userService.registerPartner(user);
    const userDto: IUserDto = userMapper.toDto(createdUser);

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
