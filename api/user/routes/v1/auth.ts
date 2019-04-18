import * as express from "express";
import debug = require("debug");
import chalk from "chalk";

import { uriBuilder } from "../../../common/utils/uri";
import { response } from "../../../common/utils/response";
import { authController } from "../../controllers";

const authRouter = express.Router();

authRouter.post("/googleLogin", async (req, res) => {
  try {
    const { idToken } = req.body;
    const source: string = uriBuilder(req);
    const userInfo = await authController.googleLogin(idToken);
    return res.send(response.success(userInfo, 200, source));
  } catch (err) {
    debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
    res.json({
      statusCode: 500,
      message: "Internal Server Error"
    });
  }
});

export { authRouter };
