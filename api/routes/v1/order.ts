import { Express } from "express";

import { orderController } from "../../controllers";
import { validation } from "../../middlewares";
import { orderSchema } from "../../utils/schemas";
import { validateJWT } from "./../../policies";

// TODO: update docs according to the new model
export const orderRoutes = (app: Express) => {
  /**
   * @api        {get}  /v1/orders  Get orders
   * @apiGroup   Orders
   *
   * @apiSuccess  {Object[]}      order	                                orders collection
   * @apiSuccess  {string}	      order.id	                            order id
   * @apiSuccess  {number}	      order.shrimp_tortas_total	            order shrimp tortas total
   * @apiSuccess  {number}        order.shrimp_torta_unitary_price	    order shrimp torta unitary price
   * @apiSuccess  {number}        order.poc_chuc_tortas_total		        order poc-chuc tortas total
   * @apiSuccess  {number}        order.poc_chuc_torta_unitary_price	  order poc chuc torta unitary price
   * @apiSuccess  {Object}	      order.event	                          event information
   * @apiSuccess  {string}        order.event.id	                      event id
   * @apiSuccess  {number}        order.event.createdAt	                event creation date
   * @apiSuccess  {owner}         order.owner	Object	                  information
   * @apiSuccess  {string}	      order.owner.id	                      owner id
   * @apiSuccess  {string}	      order.owner.name	                    owner name
   * @apiSuccess  {boolean}	      order.paid                            order paid status
   * @apiSuccess  {boolean}       order.canceled	                      order canceled status
   *
   * @apiSuccessExample Success
   * HTTP 1.1 200 Ok
   *[{
   *    "id": "25122a83-97b8-4745-aad6-26a82b1e114f",
   *    "total": 45,
   *    "shrimpTortasTotal": 1,
   *    "shrimpTortaUnitaryPrice": 25,
   *    "pocChucTortasTotal": 1,
   *    "pocChucTortaUnitaryPrice": 20,
   *    "event": {
   *        "id": "404e61b8-3785-42d0-8d09-3fb0d1eb56d3",
   *        "createdAt": 1548000000
   *    },
   *    "owner": {
   *        "id": "c0353fb3-c5c9-412e-af2f-e56a5287b807",
   *        "name": "Juan Perez"
   *    },
   *    "paid": false,
   *    "canceled": false
   *}]
   */

  app.get("/v1/orders", validateJWT("access"), orderController.getOrders);
  /**
   * @api        {get}  /v1/orders/:orderId Get order
   * @apiGroup   Orders
   *
   * @apiSuccess  {Object}        order	                                orders collection
   * @apiSuccess  {string}	      order.id	                            order id
   * @apiSuccess  {number}	      order.shrimp_tortas_total	            order shrimp tortas total
   * @apiSuccess  {number}        order.shrimp_torta_unitary_price	    order shrimp torta unitary price
   * @apiSuccess  {number}        order.poc_chuc_tortas_total		        order poc-chuc tortas total
   * @apiSuccess  {number}        order.poc_chuc_torta_unitary_price	  order poc chuc torta unitary price
   * @apiSuccess  {Object}	      order.event	                          event information
   * @apiSuccess  {string}        order.event.id	                      event id
   * @apiSuccess  {number}        order.event.createdAt	                event creation date
   * @apiSuccess  {owner}         order.owner	Object	                  information
   * @apiSuccess  {string}	      order.owner.id	                      owner id
   * @apiSuccess  {string}	      order.owner.name	                    owner name
   * @apiSuccess  {boolean}	      order.paid                            order paid status
   * @apiSuccess  {boolean}       order.canceled	                      order canceled status
   *
   * @apiSuccessExample Success
   * HTTP 1.1 200 Ok
   * {
   *    "id": "25122a83-97b8-4745-aad6-26a82b1e114f",
   *    "total": 45,
   *    "shrimpTortasTotal": 1,
   *    "shrimpTortaUnitaryPrice": 25,
   *    "pocChucTortasTotal": 1,
   *    "pocChucTortaUnitaryPrice": 20,
   *    "event": {
   *        "id": "404e61b8-3785-42d0-8d09-3fb0d1eb56d3",
   *        "createdAt": 1548000000
   *    },
   *    "owner": {
   *        "id": "c0353fb3-c5c9-412e-af2f-e56a5287b807",
   *        "name": "Juan Perez"
   *    },
   *    "paid": false,
   *    "canceled": false
   * }
   */
  app.get(
    "/v1/orders/:orderId",
    validateJWT("access"),
    validation({ orderId: orderSchema.orderId }, "params"),
    orderController.getOrder
  );
  /**
   * @api        {post}  /v1/orders Create order
   * @apiGroup   Orders
   *
   * @apiParam  {Object}        order	                                orders collection
   * @apiParam  {number}	      order.shrimp_tortas_total	            order shrimp tortas total
   * @apiParam  {number}        order.shrimp_torta_unitary_price	    order shrimp torta unitary price
   * @apiParam  {number}        order.poc_chuc_tortas_total		        order poc-chuc tortas total
   * @apiParam  {number}        order.poc_chuc_torta_unitary_price	  order poc chuc torta unitary price
   * @apiParam  {Object}	      order.event	                          event information
   * @apiParam  {string}        order.event.id	                      event id
   * @apiParam  {number}        order.event.createdAt	                event creation date
   * @apiParam  {owner}         order.owner	Object	                  information
   * @apiParam  {string}	      order.owner.id	                      owner id
   * @apiParam  {string}	      order.owner.name	                    owner name
   * @apiParam  {boolean}	      order.paid                            order paid status
   * @apiParam  {boolean}       order.canceled	                      order canceled status
   *
   * @apiSuccess  {Object}        order	                                orders collection
   * @apiSuccess  {string}	      order.id	                            order id
   * @apiSuccess  {number}	      order.shrimp_tortas_total	            order shrimp tortas total
   * @apiSuccess  {number}        order.shrimp_torta_unitary_price	    order shrimp torta unitary price
   * @apiSuccess  {number}        order.poc_chuc_tortas_total		        order poc-chuc tortas total
   * @apiSuccess  {number}        order.poc_chuc_torta_unitary_price	  order poc chuc torta unitary price
   * @apiSuccess  {Object}	      order.event	                          event information
   * @apiSuccess  {string}        order.event.id	                      event id
   * @apiSuccess  {number}        order.event.createdAt	                event creation date
   * @apiSuccess  {owner}         order.owner	Object	                  information
   * @apiSuccess  {string}	      order.owner.id	                      owner id
   * @apiSuccess  {string}	      order.owner.name	                    owner name
   * @apiSuccess  {boolean}	      order.paid                            order paid status
   * @apiSuccess  {boolean}       order.canceled	                      order canceled status
   *
   * @apiParamExample Input
   * {
   *    "total": 45,
   *    "shrimpTortasTotal": 1,
   *    "shrimpTortaUnitaryPrice": 25,
   *    "pocChucTortasTotal": 1,
   *    "pocChucTortaUnitaryPrice": 20,
   *    "event": {
   *        "id": "404e61b8-3785-42d0-8d09-3fb0d1eb56d3",
   *        "createdAt": 1548000000
   *    },
   *    "owner": {
   *        "id": "c0353fb3-c5c9-412e-af2f-e56a5287b807",
   *        "name": "Juan Perez"
   *    },
   *    "paid": false,
   *    "canceled": false
   * }
   *
   * @apiSuccessExample Success
   * HTTP 1.1 200 Ok
   * {
   *    "id": "25122a83-97b8-4745-aad6-26a82b1e114f",
   *    "total": 45,
   *    "shrimpTortasTotal": 1,
   *    "shrimpTortaUnitaryPrice": 25,
   *    "pocChucTortasTotal": 1,
   *    "pocChucTortaUnitaryPrice": 20,
   *    "event": {
   *        "id": "404e61b8-3785-42d0-8d09-3fb0d1eb56d3",
   *        "createdAt": 1548000000
   *    },
   *    "owner": {
   *        "id": "c0353fb3-c5c9-412e-af2f-e56a5287b807",
   *        "name": "Juan Perez"
   *    },
   *    "paid": false,
   *    "canceled": false
   * }
   */
  app.post(
    "/v1/orders",
    validateJWT("access"),
    validation(orderSchema.order),
    orderController.createOrder
  );
  /**
   * @api        {post}  /v1/orders/actions Actions
   * @apiGroup   Orders
   *
   * @apiParam   {Object}    action            action information
   * @apiParam   {string}    action.action     action ("mark_as_paid" | "mark_as_not_paid")
   * @apiParam   {string[]}  action.ids        events ids
   *
   * @apiParamExample Input
   * {
   *  "action": "mark_as_paid",
   *  "ids": ["1", "2"]
   * }
   *
   */
  app.post(
    "/v1/orders/actions",
    validateJWT("access"),
    orderController.handleAction
  );
  /**
   * @api        {post}  /v1/orders Update order
   * @apiGroup   Orders
   *
   * @apiParam  {Object}        order	                                orders collection
   * @apiParam  {number}	      order.shrimp_tortas_total	            order shrimp tortas total
   * @apiParam  {number}        order.shrimp_torta_unitary_price	    order shrimp torta unitary price
   * @apiParam  {number}        order.poc_chuc_tortas_total		        order poc-chuc tortas total
   * @apiParam  {number}        order.poc_chuc_torta_unitary_price	  order poc chuc torta unitary price
   * @apiParam  {Object}	      order.event	                          event information
   * @apiParam  {string}        order.event.id	                      event id
   * @apiParam  {number}        order.event.createdAt	                event creation date
   * @apiParam  {owner}         order.owner	Object	                  information
   * @apiParam  {string}	      order.owner.id	                      owner id
   * @apiParam  {string}	      order.owner.name	                    owner name
   * @apiParam  {boolean}	      order.paid                            order paid status
   * @apiParam  {boolean}       order.canceled	                      order canceled status
   *
   * @apiSuccess  {Object}      order	                                orders collection
   * @apiSuccess  {string}	    order.id	                            order id
   * @apiSuccess  {number}	    order.shrimp_tortas_total	            order shrimp tortas total
   * @apiSuccess  {number}      order.shrimp_torta_unitary_price	    order shrimp torta unitary price
   * @apiSuccess  {number}      order.poc_chuc_tortas_total		        order poc-chuc tortas total
   * @apiSuccess  {number}      order.poc_chuc_torta_unitary_price	  order poc chuc torta unitary price
   * @apiSuccess  {Object}	    order.event	                          event information
   * @apiSuccess  {string}      order.event.id	                      event id
   * @apiSuccess  {number}      order.event.createdAt	                event creation date
   * @apiSuccess  {owner}       order.owner	Object	                  information
   * @apiSuccess  {string}	    order.owner.id	                      owner id
   * @apiSuccess  {string}	    order.owner.name	                    owner name
   * @apiSuccess  {boolean}	    order.paid                            order paid status
   * @apiSuccess  {boolean}     order.canceled	                      order canceled status
   * @apiParamExample Input
   * {
   *    "total": 45,
   *    "shrimpTortasTotal": 1,
   *    "shrimpTortaUnitaryPrice": 25,
   *    "pocChucTortasTotal": 1,
   *    "pocChucTortaUnitaryPrice": 20,
   *    "event": {
   *        "id": "404e61b8-3785-42d0-8d09-3fb0d1eb56d3",
   *        "createdAt": 1548000000
   *    },
   *    "owner": {
   *        "id": "c0353fb3-c5c9-412e-af2f-e56a5287b807",
   *        "name": "Juan Perez"
   *    },
   *    "paid": false,
   *    "canceled": false
   * }
   *
   * @apiSuccessExample Success
   * HTTP 1.1 200 Ok
   * {
   *    "id": "25122a83-97b8-4745-aad6-26a82b1e114f",
   *    "total": 45,
   *    "shrimpTortasTotal": 1,
   *    "shrimpTortaUnitaryPrice": 25,
   *    "pocChucTortasTotal": 1,
   *    "pocChucTortaUnitaryPrice": 20,
   *    "event": {
   *        "id": "404e61b8-3785-42d0-8d09-3fb0d1eb56d3",
   *        "createdAt": 1548000000
   *    },
   *    "owner": {
   *        "id": "c0353fb3-c5c9-412e-af2f-e56a5287b807",
   *        "name": "Juan Perez"
   *    },
   *    "paid": false,
   *    "canceled": false
   * }
   */

  app.put(
    "/v1/orders/:orderId",
    validateJWT("access"),
    validation({ orderId: orderSchema.orderId }, "params"),
    validation(orderSchema.order),
    orderController.updateOrder
  );
};
