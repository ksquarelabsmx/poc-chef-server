export const OrdersController = (ordersDataSource, ordersRepository) => {
  const getAll = async (_req, res) => {
    const orders = await ordersRepository.getAll();
    res.json({ orders });
  };

  const createOrder = async (req, res) => {
    const order = await ordersRepository.createOne(req.body);
    res.json({
      order
    });
  };

  const updateOrderById = async (req, res) => {
    try {
      const order = await ordersRepository.updateOneById(
        req.params.id,
        req.body
      );
      return res.json({
        order
      });
    } catch (err) {
      if (err.type === "ORDER_NOT_FOUND") {
        return res.json({ ok: false, status: "404", message: "Not Found" });
      }

      return res.json({
        ok: false,
        status: "500",
        message: "Internal Server Error"
      });
    }
  };

  const cancelOrderById = async (req, res) => {
    try {
      const order = await ordersRepository.cancelOrderById(req.params.id);
      return res.json({
        order
      });
    } catch (err) {
      if (err.type === "ORDER_ALREADY_CANCELLED") {
        return res.json({
          ok: false,
          status: "400",
          message: "Bad Request",
          error: "Order already cancelled"
        });
      }

      if (err.type === "ORDER_NOT_FOUND") {
        return res.json({ ok: false, status: "404", message: "Not Found" });
      }

      return res.json({
        ok: false,
        status: "500",
        message: "Internal Server Error"
      });
    }
  };

  return {
    getAll,
    createOrder,
    updateOrderById,
    cancelOrderById
  };
};
