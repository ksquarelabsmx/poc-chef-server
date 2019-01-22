'use strict'

const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');

module.exports = (sequelize, DataTypes) => {

  let model = sequelize.define('Event', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    end_date: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    start_hour: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    end_hour: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    poc_chuc_torta_unitary_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    shrimp_torta_unitary_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  });

  // methods

  return model;
}