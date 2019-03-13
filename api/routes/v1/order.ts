import { orderController } from "../../controllers/order";
import { validation } from "../../middlewares/validationHandler";
import { createOrderSchema, orderIdSchema } from "../../utils/schemas/order";

export const orderRoutes = (app: any) => {
  /**
   * @api        {get}  /v1/orders  Get all orders
   * @apiGroup   Orders
   */
  app.get("/v1/orders", orderController.getOrders);
  /**
   * @api        {get}  /v1/orders/:orderId Get specific order
   * @apiGroup   Orders
   */
  app.get(
    "/v1/orders/:orderId",
    validation({ orderId: orderIdSchema }, "params"),
    orderController.getOrder
  );
  /**
   * @api        {post}  /v1/orders
   * @apiGroup   Orders
   */
  app.post(
    "/v1/orders",
    validation(createOrderSchema),
    orderController.createOrder
  );
  /**
   * @api        {post}  /v1/orders Action
   * @apiGroup   Orders
   */
  app.post("/v1/orders/actions", orderController.handleAction);
  /**
   * @api        {put}  /v1/orders
   * @apiGroup   Orders
   */
  app.put(
    "/v1/orders/:orderId",
    validation({ orderId: orderIdSchema }, "params"),
    validation(createOrderSchema),
    orderController.updateOrder
  );
};
