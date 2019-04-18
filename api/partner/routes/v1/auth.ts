import * as express from "express";
import debug = require("debug");
import chalk from "chalk";

import { authController } from "../../controllers";
import { validation } from "../../../common/middlewares";
import { credentialsSchema } from "../../../common/utils/schemas";
import { ILogin } from "../../../common/interfaces/auth";
import { uriBuilder, response } from "../../../common/utils";

const authRouter = express.Router();
/**
 * @swagger
 * definitions:
 *   Login:
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *   LoginResponse:
 *     required:
 *       - jwt
 *       - user
 *     properties:
 *       jwt:
 *         type: string
 *       user:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *           name:
 *             type: string
 *           email:
 *             type: string
 *           role:
 *             type: string
 *           auth_provider:
 *             type: string
 *           created_at:
 *             type: number
 *           updated_at:
 *             type: number
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth
 */

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     description: Create event
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Auth
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: login
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Login"
 *         required: true
 *         description: Login object
 *         example:
 *           email: admin@example.com
 *           password: adminpassword
 *     responses:
 *       200:
 *         description: Login
 *         schema:
 *           type: object
 *           $ref: "#/definitions/LoginResponse"
 *       400:
 *         description: Bad Request. Invalid email.
 *       401:
 *         description: Unauthorized. Invalid password
 *       500:
 *         description: Internal Server Error
 */

authRouter.post(
  "/login",
  validation(credentialsSchema.credentials),
  async (req, res) => {
    try {
      const source: string = uriBuilder(req);
      const loginCredentials: ILogin = { ...req.body };
      const userInfo = await authController.login(loginCredentials);
      return res.send(response.success(userInfo, 200, source));
    } catch (err) {
      debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
      res.json({
        statusCode: 500,
        message: "Internal Server Error"
      });
    }
  }
);

export { authRouter };
