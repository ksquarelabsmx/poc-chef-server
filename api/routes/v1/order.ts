const orderController = require("../../controllers/order");

module.exports = (app: any) => {
  app.get("/v1/orders", orderController.getOrders);

  app.patch("/v1/orders/actions", orderController.handleAction);
};
