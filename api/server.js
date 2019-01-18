'use strict'

/**
 * author: ivan sabido
 * date: 22/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 * description: Executes the express server.
 */

/**
 * third party libraries
 */
const app = require('./app');
const http = require('http');
const chalk = require('chalk');
const debug = require('debug')('chef:orders:server');
const db = require('../api/models');
/**
 * server configuration
 */
const {
  config
} = require('../config');

const server = http.Server(app);

// server listening
server.listen(config.server.port, async function () {
  debug(`Server Running on port: ${chalk.cyan(config.server.port)}`)
  if (!['production', 'development', 'testing'].includes(config.server.name)) {
    console.error(`NODE_ENV is set to ${config.server.name}, but only production and development are valid.`);
    process.exit(1);
  }
  await db(config.db).catch(handleFatalError)
})

function handleFatalError(err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}