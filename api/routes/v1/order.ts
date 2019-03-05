import { orderController } from "../../controllers/order";
import { validation } from "../../middlewares/validationHandler";
import { createOrderSchema, orderIdSchema } from "../../utils/schemas/order";

export const orderRoutes = (app: any) => {
  app.get("/v1/orders", orderController.getOrders);
  app.get(
    "/v1/orders/:orderId",
    validation({ orderId: orderIdSchema }, "params"),
    orderController.getOrder
  );
  app.post(
    "/v1/orders",
    validation(createOrderSchema),
    orderController.createOrder
  );
  app.post("/v1/orders/actions", orderController.handleAction);
  app.put(
    "/v1/orders/:orderId",
    validation({ orderId: orderIdSchema }, "params"),
    validation(createOrderSchema),
    orderController.updateOrder
  );
};
