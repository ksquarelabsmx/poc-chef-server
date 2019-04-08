import { ordersDataSource, productsDataSource } from "../data-sources";

const calculateTotal = products => {
  return products.reduce((acc, product) => {
    return acc + product.quantity * product.price;
  }, 0);
};

const normalizeProducts = (records, products) => {
  return records
    .map(docs => docs[0])
    .map(prod => {
      const rawProduct = products.filter(rawProd => rawProd.id === prod.id)[0];

      return {
        ...prod,
        quantity: rawProduct.quantity
      };
    });
};

export const getAll = async (_req, res) => {
  const orders = await ordersDataSource.find();
  res.json({ orders });
};

export const createOrder = async (req, res) => {
  const payload = req.body;

  const records = await Promise.all(
    payload.products.map(async order =>
      productsDataSource.find({ id: order.id })
    )
  );

  const products = normalizeProducts(records, payload.products);

  const order = await ordersDataSource.save({
    ...payload,
    products
  });

  res.json({
    order
  });
};

export const updateOrderById = async (req, res) => {
  const payload = req.body;
  const records = await ordersDataSource.find({ id: req.params.id });
  const order = records[0];

  if (!order) {
    return res.json({ ok: false, status: "404", message: "Not Found" });
  }

  const updatedProducts = order.products
    .filter(product => {
      return (
        order.products.findIndex(oldProduct => {
          return oldProduct.id === product.id;
        }) !== -1
      );
    })
    .map(product => {
      const index = payload.products.findIndex(raw => raw.id === product.id);

      if (index == -1) {
        return null;
      }

      const quantity = payload.products[index].quantity;
      const price = product.price;

      return {
        ...product,
        quantity,
        subtotal: quantity * price
      };
    })
    .filter(product => product);

  const updateOrder = await ordersDataSource.update({
    ...order,
    products: updatedProducts,
    total: calculateTotal(updatedProducts)
  });

  return res.json({
    order: updateOrder
  });
};
