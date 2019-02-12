'use strict'
const OrderModel = require('../../models/order')

async function createOrUpdate(event) {
  const cond = {
    where: {
      id: event.id
    }
  }

  const existingEvent = await OrderModel.findOne(cond)

  if (existingEvent) {
    const updated = await OrderModel.update(event, cond)
    return updated ? OrderModel.findOne(cond) : existingEvent
  }

  const result = await OrderModel.create(event)
  return result.toJSON()
}

function findById(id) {
  return OrderModel.findById(id)
}

function findAll() {
  return OrderModel.findAll()
}

module.exports = {
  createOrUpdate,
  findById,
  findAll
}