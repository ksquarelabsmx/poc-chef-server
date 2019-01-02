'use strict'

/**
 * author: ivan sabido
 * date: 27/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 */

const OrderController = require('../../controllers/order')
const orderControllr = new OrderController()
module.exports = app => {
  app.get('/v1/orders', orderControllr.getOrders)
}