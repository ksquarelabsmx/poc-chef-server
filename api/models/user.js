'use strict'
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
module.exports = (sequelize, DataTypes) => {

  let model = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  model.beforeSave(async (user, options) => {
    if (user.changed('password')) {
      let hash;
      try {
        hash = await bcrypt.hash(user.password, 12)
        user.password = hash;
      } catch (err) {
        throw err;
      }
    }
  });
  model.prototype.comparePassword = async function (pw) {
    let pass;
    try {
      if (!this.password) throw Error('password not set');

      pass = await bcrypt.compare(pw, this.password);

      if (!pass) throw Error("Invalid password.");

      return this;
    } catch (err) {
      throw err;
    }

  }
  return model;
}