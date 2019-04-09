'use strict'

const {
  Event: EventModel
} = require('../../models')
async function createOrUpdate(event) {
  const cond = {
    where: {
      id: event.id
    }
  }

  const existingEvent = await EventModel.findOne(cond)

  if (existingEvent) {
    const updated = await EventModel.update(event, cond)
    return updated ? EventModel.findOne(cond) : existingEvent
  }

  const result = await EventModel.create(event)
  return result.toJSON()
}

function findById(id) {
  return EventModel.findById(id)
}

function findAll() {
  return EventModel.findAll()
}
module.exports = {
  createOrUpdate,
  findById,
  findAll
}