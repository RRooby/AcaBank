const Transfer = require("../models/transfers.model");
const User = require("../models/users.model");
const catchAsync = require("../utils/catchAsync");

exports.sendTransfer = catchAsync(async (req, res) => {
  const { amount, senderUserId, accountNumber } = req.body;

  const client = await User.findOne({
    where: {
      status: "active",
      accountNumber,
    },
  });

  const userClient = await User.findOne({
    where: {
      status: "active",
      id: senderUserId,
    },
  });

  if (!client || !userClient) {
    return res.status(404).json({
      message: "Account number or sender not found",
    });
  }

  if (userClient.amount < amount) {
    return res.status(404).json({
      message: "You don't have enough balance",
    });
  }

  if (userClient.id === client.id) {
    return res.status(404).json({
      message: "You can't send money to your account",
    });
  }

  const newAmountUserClient = +userClient.amount - +amount;
  const newAmountClient = +client.amount + +amount;

  await userClient.update({ amount: newAmountUserClient });
  await client.update({ amount: newAmountClient });

  const transfer = await Transfer.create({
    amount,
    senderUserId,
    accountNumber,
  });

  res.status(200).json({
    status: "succes",
    message: "Successful transfer!",
    transfer,
  });
});
