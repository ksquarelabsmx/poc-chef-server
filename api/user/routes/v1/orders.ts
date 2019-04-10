import * as express from "express";
import { ordersController } from "../../controllers/";
import * as orderMapper from "api/common/mappers/order";
import { errorStrategy } from "api/user/strategies";

const ordersRouter = express.Router();

ordersRouter.get("/", async (_req, res) => {
  const orders = await ordersController.getAll();
  const ordersDto = orders.map(orderMapper.toDto);
  res.json({ orders: ordersDto });
});

ordersRouter.post("/", async (req, res) => {
  const order = await ordersController.createOrder(req.body);
  const orderDto = orderMapper.toDto(order);
  res.json({
    order: orderDto
  });
});

ordersRouter.put("/:id", async (req, res) => {
  try {
    const order = await ordersController.updateOrderById(
      req.params.id,
      req.body
    );
    const orderDto = orderMapper.toDto(order);
    return res.json({
      order: orderDto
    });
  } catch (err) {
    return res.json(errorStrategy.handle(err));
  }
});

ordersRouter.post("/:id/cancel", async (req, res) => {
  try {
    const order = await ordersController.cancelOrderById(req.params.id);
    const orderDto = orderMapper.toDto(order);
    return res.json({
      order: orderDto
    });
  } catch (err) {
    return res.json(errorStrategy.handle(err));
  }
});

export { ordersRouter };
