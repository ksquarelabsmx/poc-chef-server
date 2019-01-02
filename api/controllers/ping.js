'use strinct'

/**
 * author: ivan sabido
 * date: 26/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 * description: 
 */

const debug = require('debug')('chef:orders:controller:ping')
const chalk = require('chalk')

const pong = async (req, res) => {
  debug(`Ping: ${chalk.green('checking api health')}`)
  res.send({
    message: 'pong'
  })
}

module.exports = {
  pong
}