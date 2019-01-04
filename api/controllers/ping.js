'use strinct'

/**
 * author: ivan sabido
 * date: 26/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 * description: 
 */

const debug = require('debug')('chef:orders:controller:ping')
const chalk = require('chalk')

const pong = async (req, res, next) => {
  try {
    debug(`Ping: ${chalk.green('checking api health')}`)
    throw new Error('No se que onda')
    // res.send({
    //   message: 'pong'
    // })
  } catch (err) {
    next(err)
  }

}

module.exports = {
  pong
}