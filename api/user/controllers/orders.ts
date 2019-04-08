import { ordersDataSource, productsDataSource } from "../data-sources";

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
