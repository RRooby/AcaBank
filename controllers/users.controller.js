const User = require("../models/users.model");
const Transfer = require("../models/transfers.model");
const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res) => {
  const { name, password } = req.body;

  const user = await User.create({
    name,
    password,
  });

  res.status(201).json({
    status: "success",
    message: "Account succesfully created!",
  });
});

exports.login = catchAsync(async (req, res) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber,
      password,
      status: "active",
    },
  });

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "Password or account number invalid!",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Login succesful!",
    user,
  });
});

exports.findOne = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      status: "active",
      id,
    },
  });

  const userTransfer = await Transfer.findAll({
    where: {
      senderUserId: id,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "Request's succes",
    userTransfer,
  });
});
