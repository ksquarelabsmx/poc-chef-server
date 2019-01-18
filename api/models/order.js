'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../utils/db/connection')

module.exports = function setupOrderModel(config) {
  const sequelize = setupDatabase(config)
  return sequelize.define('order', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    total: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
  });
}