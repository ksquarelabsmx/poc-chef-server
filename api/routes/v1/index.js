'use strict'

/**
 * author: ivan sabido
 * date: 25/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 */

const ping = require('./ping')
const order = require('./order')
const event = require('./event')

module.exports = (app) => {
  ping(app);
  order(app);
  event(app);
}