"use strict";

/**
 * author: ivan sabido
 * date: 29/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 */
const boom = require("boom");
const dataSource = require("../data-source/data-source");

const getOrders = async () => {
  return Promise.resolve(dataSource.orders);
};

const getOrder = async ({ orderId }) => {
  return Promise.resolve(ordersMocks[0]);
};

const createOrder = async ({ order }) => {
  const event = dataSource.events.find(event => event.id === order.event.id);
  if (event) {
    if (!event.finished){
      return Promise.resolve(dataSource.addOrder(order));
    }
    return Promise.reject(new Error("That event has already finished"))
  }
  return Promise.reject(new Error("That event Id did not match any event"));
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
