import * as express from "express";

import { respError } from "../../../common/middlewares";
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
    res.send(respError(req, err));
  }
});

export { authRouter };
