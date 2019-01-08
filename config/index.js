'use strict'
/**
 * author: ivan sabido
 * date: 28/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 * description: Archivo de configuración del proyecto.
 */
// load .env file
require('dotenv').config();

const debug = require('debug')('chef:orders:api:configuration');
const chalk = require('chalk');

let config = null;
debug(`Configuration API-Chef-Orders: ${chalk.magenta('getting configurations...')}`);

const configurations = {
  production: {
    server: {
      name: 'production',
      port: process.env.PORT
    }
  },
  testing: {
    server: {
      name: 'testing',
      port: process.env.PORT
    }
  },
  development: {
    server: {
      name: 'development',
      port: process.env.PORT,
    },
    auth: {
      username: process.env.AUTH_ADMIN_USERNAME,
      password: process.env.AUTH_ADMIN_USERNAME,
      email: process.env.AUTH_ADMIN_EMAIL,
      jwt_secret: process.env.AUTH_JWT_SECRET
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