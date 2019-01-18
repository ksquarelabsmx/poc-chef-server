'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../utils/db/connection')

module.exports = function setupEventModel(config) {
  const sequelize = setupDatabase(config)
  return sequelize.define('event', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    event_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    start_date: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    end_date: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    start_hour: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    end_hour: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    poc_chuc_torta_unitary_price: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    shrimp_torta_unitary_price: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  });
}