'use strict'

/**
 * author: ivan sabido
 * date: 27/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 */

const orderController = require('../../controllers/order')

module.exports = app => {
  app.get('/v1/orders', orderController.getOrders)
}