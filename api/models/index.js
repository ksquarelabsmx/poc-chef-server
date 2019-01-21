'use strict'

const setupDatabase = require('../utils/db/connection')
const setupEventModel = require('./event')
const setupOrderModel = require('./order')
const setupUserModel = require('./user')
const setupEvent = require('../utils/db/event')
const setupOrder = require('../utils/db/order')
const setupUser = require('../utils/db/user')

module.exports = async function (config) {

  // Setting up Models
  const sequelize = setupDatabase(config)
  const EventModel = setupEventModel(config)
  const OrderModel = setupOrderModel(config)
  const UserModel = setupUserModel(config)

  // Relations
  UserModel.hasMany(OrderModel, {
    onDelete: 'CASCADE'
  });
  EventModel.hasMany(OrderModel, {
    onDelete: 'CASCADE'
  });
  OrderModel.belongsTo(UserModel, {
    onDelete: 'CASCADE'
  });
  OrderModel.belongsTo(EventModel, {
    onDelete: 'CASCADE'
  });

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({
      force: true
    })
  }


  // Functions
  const Event = setupEvent(EventModel)
  const Order = setupOrder(OrderModel)
  const User = setupUser(UserModel)

  return {
    Event,
    Order,
    User
  }
}