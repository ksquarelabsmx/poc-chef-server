import { Express } from "express";

import { authController } from "./../../controllers";
import { validation } from "../../middlewares/validationHandler";
import { credentialsSchema } from "../../utils/schemas/auth";

export const authRoutes = (app: Express) => {
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
   *
   * @apiError  invalidEmail      invalid email
   * @apiError  invalidPassword   invalid password
   * 
   * @apiErrorExample {json} invalidEmail
   * HTTP 1.1 400 Bad Request
   * {
   *  "status": 400,
   *  "message": "Bad Request",
   *  "errors": {
   *     "field": "email",
   *     "error": "invalid email"
   *   }
   * }
   *
   * @apiErrorExample {json} invalidPassword
   * HTTP 1.1 401 Unauthorized
   * {
   *  "status": 401,
   *  "message": "Unauthorized",
   *  "errors": {
   *     "field": "password",
   *     "error": "invalid password"
   *   }
   * }

   */
  app.post(
    "/v1/auth/login",
    validation(credentialsSchema),
    authController.login
  );

  app.post("/v1/auth/googleLogin", authController.googleLogin);
};
