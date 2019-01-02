'use strict'

/**
 * author: ivan sabido
 * date: 29/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 */

const ordersMocks = require('../utils/mocks/order');

class OrderService {
    constructor() {

    }

    getOrders() {
        return Promise.resolve(ordersMocks);
    }

    getOrder({
        orderId
    }) {
        return Promise.resolve(ordersMocks[0]);
    }

    createOrder({
        order
    }) {
        return Promise.resolve(ordersMocks[0]);
    }

    updateOrder({
        orderId,
        order
    }) {
        return Promise.resolve(ordersMocks[0]);
    }

    deleteOrder({
        orderId
    }) {
        return Promise.resolve(ordersMocks[0]);
    }
}

module.exports = OrderService;