const orderController = require("../../controllers/order");
const validation = require("../../middlewares/validationHandler");
const { createOrderSchema } = require("../../utils/schemas/order");

module.exports = (app: any) => {
  app.get("/v1/orders", orderController.getOrders);
  app.post(
    "/v1/orders",
    validation(createOrderSchema),
    orderController.createOrder
  );
};
