'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../utils/db/connection')

module.exports = function setupUserModel(config) {
  const sequelize = setupDatabase(config)
  return sequelize.define('user', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
  });
}