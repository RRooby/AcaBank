const express = require("express");

const router = express.Router();

const userController = require("../controllers/users.controller");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.get("/:id/history", userController.findOne);

module.exports = router;
