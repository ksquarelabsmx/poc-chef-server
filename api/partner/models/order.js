'use strict'


module.exports = (sequelize, DataTypes) => {

  let model = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  });
  return model;
}