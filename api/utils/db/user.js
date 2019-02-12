'use strict'
const UserModel = require('../../models/user')

async function createOrUpdate(user) {
  const cond = {
    where: {
      id: user.id
    }
  }

  const existingUser = await UserModel.findOne(cond)

  if (existingUser) {
    const updated = await UserModel.update(event, cond)
    return updated ? UserModel.findOne(cond) : existingUser
  }

  const result = await UserModel.create(user)
  return result.toJSON()
}

function findById(id) {
  return UserModel.findById(id)
}

function findAll() {
  return UserModel.findAll()
}

module.exports = {
  createOrUpdate,
  findById,
  findAll
}