import chalk from "chalk";
import * as Debug from "debug";
import { Response, Request, NextFunction } from "express";

import { uriBuilder, response } from "../../common/utils";
import { user } from "../../common/interfaces";
import { userMapper } from "./../../common/mappers";
import { userService } from "../services";

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

    const createdUser = await userService.registerPartner(user);
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
