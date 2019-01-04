'use strict'
/**
 * author: ivan sabido
 * date: 28/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 * description: Archivo de configuración del proyecto.
 */

const debug = require('debug')('chef:orders:api:configuration');
const chalk = require('chalk');

let config = null;
debug(`Configuration API-Chef-Orders: ${chalk.magenta('getting configurations...')}`);

const configurations = {
  production: {
    server: {
      name: 'production',
      port: process.env.PORT || 8080
    }
  },
  testing: {
    server: {
      name: 'testing',
      port: process.env.PORT || 3000
    }
  },
  development: {
    server: {
      name: 'development',
      port: process.env.PORT || 3000
    }
  }
}

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV || 'development';

switch (environment) {
  case 'production':
    config = configurations['production']
    break
  case 'development':
    config = configurations['development']
    break
  default:
    config = configurations['testing']
}

module.exports = {
  config
};