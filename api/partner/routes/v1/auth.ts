import { Express } from "express";

import { authController } from "../../controllers";
import { validation } from "../../middlewares";
import { credentialsSchema } from "../../utils/schemas";

export const authRoutes = (app: Express) => {
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

  /**
   * @api        {post}  /v1/auth/login login
   * @apiGroup   Auth
   *
   * @apiParam   {Object}    login             login credentials
   * @apiParam   {string}    login.email       user email
   * @apiParam   {string}    login.password    user password
   *
   * @apiSuccess {Object}    user              user information
   * @apiSuccess {string}    user.id           user id
   * @apiSuccess {string}    user.email        user email
   * @apiSuccess {string}    user.role         user role
   *
   * @apiParamExample Input
   * {
   *    "admin": "admin@example.com",
   *    "password": "adminpassword"
   * }
   *
   * @apiSuccessExample {json} Success
   * HTTP 1.1 200 Ok
   * {
   *  "id": "58f89fae-8b54-4cce-ba3b-fa44b72c71d4",
   *  "email": "admin@example.com",
   *  "role": "admin partner"
   * }
   */
  app.post(
    "/v1/auth/login",
    validation(credentialsSchema.credentials),
    authController.login
  );

  app.post("/v1/auth/googleLogin", authController.googleLogin);
};
