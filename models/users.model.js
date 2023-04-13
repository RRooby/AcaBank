const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const User = db.define("user", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: function generateAccountNumber() {
      const randomNumber = Math.floor(Math.random() * 999999) + 1;
      return randomNumber.toString().padStart(6, "0");
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1000,
  },
  status: {
    type: DataTypes.ENUM("active", "disabled"),
    defaultValue: "active",
    allowNull: false,
  },
});

module.exports = User;
