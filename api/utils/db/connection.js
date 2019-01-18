'use strict'

/**
 * author: ivan sabido
 * date: 11/01/2019
 * email: <ivan.sabido@ksquareinc.com>
 */

const {
  config
} = require('../../../config')

const Sequelize = require('sequelize')
let sequelize = null

module.exports = function setupDatabase(dbConfig) {
  if (!sequelize) {
    sequelize = new Sequelize(dbConfig)
  }
  return sequelize
}