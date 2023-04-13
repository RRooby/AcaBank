const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Transfert = db.define("transfert", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  senderUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiverUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  accountNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Transfert;
