import { Express } from "express";

import { userSchema } from "../../utils/schemas";
import { validateJWT } from "./../../policies";
import { validation } from "../../middlewares";
import { userController } from "../../controllers";

export const userRoutes = (app: Express) => {
  /**
   * @swagger
   * definitions:
   *   User:
   *     required:
   *       - name
   *       - email
   *       - password
   *     properties:
   *       name:
   *         type: string
   *       email:
   *         type: string
   *       password:
   *         type: string
   *
   *   UserDetails:
   *     required:
   *       - id
   *       - name
   *       - email
   *       - password
   *       - created_at
   *       - updated_at
   *     properties:
   *       id:
   *         type: string
   *       name:
   *         type: string
   *       email:
   *         type: string
   *       password:
   *         type: string
   *       created_at:
   *         type: number
   *       updated_at:
   *         type: number
   */

  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: Users
   */

  /**
   * @swagger
   * /v1/users/register:
   *   post:
   *     description: Create user
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Users
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

  /**
   * invalidRole
   * HTTP 1.1 400 Bad Request
   *
   * {
   *   "status": 400,
   *   "message": "Bad Request",
   *   "errors": [
   *     {
   *       "field": "role",
   *       "error": "must be one of [partner, partner admin]"
   *     }
   *   ]
   * }
   *
   * emailInUse
   * HTTP 1.1 400 Bad Request
   *
   * {
   *   "status": 400,
   *   "message": "Bad Request",
   *   "errors": {
   *       "field": "email",
   *       "error": "email already in use"
   *     }
   * }
   */

  app.post(
    "/v1/users/register",
    validateJWT("access"),
    validation(userSchema.user),
    userController.registerPartner
  );
};
