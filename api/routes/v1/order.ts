import { orderController } from "../../controllers/order";
import { validation } from "../../middlewares/validationHandler";
import { createOrderSchema } from "../../utils/schemas/order";

export const orderRoutes = (app: any) => {
  app.get("/v1/orders", orderController.getOrders);
  app.post(
    "/v1/orders",
    validation(createOrderSchema),
    orderController.createOrder
  );
};
