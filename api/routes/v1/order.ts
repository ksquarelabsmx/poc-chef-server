import { orderController } from "../../controllers/order";
import { validation } from "../../middlewares/validationHandler";
import { createOrderSchema } from "../../utils/schemas/order";

export const orderRoutes = (app: any) => {
  /**
   * @api        {get}  /v1/orders  Get all orders
   * @apiGroup   Orders
   */
  app.get("/v1/orders", orderController.getOrders);

  /**
   * @api        {post}  /v1/orders
   * @apiGroup   Orders
   */
  app.post(
    "/v1/orders",
    validation(createOrderSchema),
    orderController.createOrder
  );
};
