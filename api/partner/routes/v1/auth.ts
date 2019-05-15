import * as express from "express";

import { authController } from "../../controllers";
import { validation, respError } from "../../../common/middlewares";
import { credentialsSchema } from "../../../common/utils/schemas";
import { ILogin } from "../../../common/interfaces/auth";
import { uriBuilder, response } from "../../../common/utils";

const authRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth
 */

/**
 * @swagger
 * definitions:
 *   LoginResponse:
 *     required:
 *       - jwt
 *       - user
 *     properties:
 *       jwt:
 *         type: string
 *         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       user:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             example: 6f4b2f3b-7585-4004-9f3c-ca5a29f2e653
 *           name:
 *             type: string
 *             example: Hal
 *           email:
 *             type: string
 *             example: admin@example.com
 *           role:
 *             type: string
 *             example: partner
 *           auth_provider:
 *             type: string
 *             example: 23984866-cef7-4f12-ae19-e5e78662e451
 *           created_at:
 *             type: number
 *             example: 1548000000
 *           updated_at:
 *             type: number
 *             example: 1548000000
 */

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     summary: Login for partner
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
 *     responses:
 *       200:
 *         description: Succesful operation
 *         schema:
 *           type: object
 *           $ref: "#/definitions/LoginResponse"
 *       400:
 *         description: Bad Request. Invalid email.
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
      res.send(respError(req, err));
    }
  }
);

export { authRouter };
