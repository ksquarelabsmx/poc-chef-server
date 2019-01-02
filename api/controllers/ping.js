'use strinct'

/**
 * author: ivan sabido
 * date: 26/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 * description: 
 */

const debug = require('debug')('chef:orders:controller:ping')
const chalk = require('chalk')

class PingController {
  async pong (req, res, next) {
    debug(`Ping: ${chalk.green('checking api health')}`)
    res.send({ message: 'pong' })
  }
}

module.exports = new PingController()
