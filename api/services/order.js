'use strict'

/**
 * author: ivan sabido
 * date: 29/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 */

const ordersMocks = require('../utils/mocks/order');

const getOrders = async () => {
  return Promise.resolve(ordersMocks);
}

const getOrder = async ({
  orderId
}) => {
  return Promise.resolve(ordersMocks[0]);
}

const createOrder = async ({
  order
}) => {
  return Promise.resolve(ordersMocks[0]);
}

module.exports = {
  getOrders,
  getOrder,
  createOrder
};