'use strinct'

/**
 * author: ivan sabido
 * date: 26/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 * description: 
 */

const debug = require('debug')('chef:orders:controller:orders');
const chalk = require('chalk');
const OrderService = require('../services/order');
const response = require('../utils/response');
const uri = require('../utils/uri');

const orderService = new OrderService();
class OrderController {
  async getOrders(req, res) {
    try {
      debug(`OrderController: ${chalk.green('getting orders')}`);
      let source = uri.getURI(req.protocol, req.originalUrl, req.get('host'));
      let orders = await orderService.getOrders();
      res.send(response.success(orders, 200, source))
    } catch (err) {
      debug(`getOrders Controller Error: ${chalk.red(err.message)}`);
      res.status(400).send(response.error('Internal Problem', 400, uri, err.message));
    }
  }
}

module.exports = OrderController;
