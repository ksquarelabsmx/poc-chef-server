import chalk from "chalk";
import * as Debug from "debug";
import { Request, Response, NextFunction } from "express";

const debug = Debug("chef:orders:server");

const pong = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`Ping: ${chalk.green("checking api health")}`);

    res.send({
      message: "pong"
    });
  } catch (err) {
    next(err);
  }
};

const pingController = { pong };
export { pingController };
