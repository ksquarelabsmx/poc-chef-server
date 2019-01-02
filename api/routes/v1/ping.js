'use strict'

/**
 * author: ivan sabido
 * date: 24/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 */

const PingController = require('../../controllers/ping');

module.exports = app => {
  app.get('/v1/ping', PingController.pong);
}