const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/users.routes");
const transferRouter = require("./routes/transfers.routes");

const AppError = require("./utils/app.Error");
const globalErrorHandler = require("./controllers/error.controller");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/transfers", transferRouter);

app.all("*", (req, res, next) => {
  return next(
    new AppError(`cannot find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
