import { IOrderRepository } from "api/common/repositories/order-repository";
import { IProductRepository } from "api/common/repositories/product-repository";

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

const calculateTotal = products => {
  return products.reduce((acc, product) => {
    return acc + product.quantity * product.price;
  }, 0);
};

export const OrderService = (
  orderRepository: IOrderRepository,
  productRepository: IProductRepository
) => {
  const getAll = () => {
    return orderRepository.find();
  };

  const createOne = async data => {
    const records = await Promise.all(
      data.products.map(async order => productRepository.find({ id: order.id }))
    );

    const products = normalizeProducts(records, data.products);

    return orderRepository.save({
      ...data,
      products
    });
  };

  const updateOneById = async (id, order) => {
    const records = await orderRepository.find({ id });
    const oldOrder = records[0];

    if (!oldOrder) {
      return Promise.reject({
        type: "ORDER_NOT_FOUND"
      });
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
        const index = order.products.findIndex(raw => raw.id === product.id);

        if (index == -1) {
          return null;
        }

        const quantity = order.products[index].quantity;
        const price = product.price;

        return {
          ...product,
          quantity,
          subtotal: quantity * price
        };
      })
      .filter(product => product);

    return orderRepository.update({
      ...order,
      products: updatedProducts,
      total: calculateTotal(updatedProducts)
    });
  };

  const cancelOrderById = async id => {
    const docs = await orderRepository.find({ id });
    const order = docs[0];

    if (!order) {
      return Promise.reject({
        type: "ORDER_NOT_FOUND"
      });
    }

    if (order.cancelled) {
      return Promise.reject({
        type: "ORDER_ALREADY_CANCELLED"
      });
    }

    return orderRepository.update({
      ...order,
      cancelled: true
    });
  };

  return {
    getAll,
    createOne,
    updateOneById,
    cancelOrderById
  };
};
