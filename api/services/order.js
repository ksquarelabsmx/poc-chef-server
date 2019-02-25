"use strict";

/**
 * author: ivan sabido
 * date: 29/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 */

const ordersMocks = require("../data-source/data-source");

const getOrders = async () => {
  return Promise.resolve(ordersMocks);
};

const getOrder = async ({ orderId }) => {
  return Promise.resolve(ordersMocks[0]);
};

const createOrder = async ({ order }) => {
  return Promise.resolve(ordersMocks[0]);
};

const markManyAsPaid = orderIds => {
  return new Promise((resolve, reject) => {
    var results = [];
    var amount = orderIds.length;
    const orders = [...ordersMocks.orders];
    orderIds.forEach(orderId => {
      const orderIndex = orders.findIndex(order => {
        return order.id === orderId;
      });

      if (orderIndex == -1) {
        results.push(`order ${orderId} not found`);
        amount--;
      } else {
        if (orders[orderIndex].paid === true) {
          amount--;
          results.push(`order ${orderId} was already marked as paid`);
        } else {
          orders[orderIndex].paid = true;
          results.push(`order ${orderId} successfully modified`);
        }
      }
    });
    if (amount === 0)
      return reject(
        new Error(
          "Those orders do not exists or they are already marked as paid"
        )
      );
    ordersMocks.orders = orders;

    return resolve(results);
  });
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  markManyAsPaid
};
