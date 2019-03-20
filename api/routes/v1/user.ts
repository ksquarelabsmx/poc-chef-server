import { Express } from "express";

import { userSchema } from "../../utils/schemas/user";
import { validation } from "../../middlewares/validationHandler";
import { userController } from "../../controllers/user";

export const userRoutes = (app: Express) => {
  /**
   * @api        {post}  /v1/users/register Register user
   * @apiGroup   User
   *
   * @apiParam   {string}    type              user role
   *
   * @apiParam   {Object}    user              user information
   * @apiParam   {string}    user.name         user name
   * @apiParam   {string}    user.password     user password
   * @apiParam   {string}    user.email        user email
   *
   * @apiSuccess {Objec}     user              user information
   * @apiSuccess {string}    user.id           user id
   * @apiSuccess {string}    user.name         user name
   * @apiSuccess {string}    user.password     user password
   * @apiSuccess {string}    user.email        user email
   * @apiSuccess {number}    user.created_at   user created epoch
   * @apiSuccess {number}    user.update_at    user updated epoch
   *
   * @apiError invalidRole   role              must be one of [partner, partner admin]
   * @apiError emailInUse    email             email already in use
   *
   * @apiParamExample Request
   * {
   *   "name": "Juan Perez",
   *   "password": "4dm1n",
   *   "email": "admin@ksquareinc.com",
   *   "role": "partner"
   * }
   *
   * @apiResponseExample Success
   * HTTP 1.1 201 Created
   * {
   *   "id": "f70bf7b4-0274-4dbf-9943-a32a46b4048a",
   *   "name": "Juan Perez",
   *   "email": "admin@ksquareinc.com",
   *   "role": "partner",
   *   "create_at": 1552602238,
   *   "update_at": 1552602238
   * }
   *
   * @apiErrorExample invalidRole
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
   * @apiErrorExample emailInUse
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
    validation(userSchema),
    userController.registerPartner
  );
};
