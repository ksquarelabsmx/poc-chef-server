import * as express from "express";

import { userSchema } from "../../../common/utils/schemas";
import { validateJWT } from "../../../common/policies";
import { validation } from "../../../common/middlewares";
import { userController } from "../../controllers";

const usersRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User
 */

/**
 * @swagger
 * /v1/users/register:
 *   post:
 *     summary: Create user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: event
 *         schema:
 *           type: object
 *           $ref: "#/definitions/User"
 *         required: true
 *         description: User object
 *     responses:
 *       200:
 *         description: Create user
 *         schema:
 *           type: object
 *           $ref: "#/definitions/UserDetails"
 *       400:
 *         description:
 *           Bad Request. Role must be one of [partner, partner admin]. Email already in use.
 *       401:
 *         description: Access token is missing or invalid
 *       500:
 *         description: Internal Server Error
 */

usersRouter.post(
  "/register",
  validateJWT("access"),
  validation(userSchema.user),
  userController.registerPartner
);

export { usersRouter };
