const express = require("express");
const ExpressError = require("./expressError");
const app = express();

const {
  findMean,
  findMedian,
  findMode,
  convertAndValidateNumsArray,
} = require("./helpers");

app.get("/mean", function (req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400
    );
  }
  let numString = req.query.nums.split(",");
  let nums = convertAndValidateNumsArray(numString);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "mean",
    result: findMean(nums),
  };
  return res.send(result);
});

app.get("/median", function (req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400
    );
  }
  let numString = req.query.nums.split(",");
  let nums = convertAndValidateNumsArray(numString);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }
  let result = {
    operation: "median",
    result: findMedian(nums),
  };
  return res.send(result);
});

app.get("/mode", function (req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError(
      "You must pass a query key of nums with a comma-separated list of numbers.",
      400
    );
  }
  let numString = req.query.nums.split(",");
  let nums = convertAndValidateNumsArray(numString);
  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }
  let result = {
    operation: "mode",
    result: findMode(nums),
  };
  return res.send(result);
});

//if no other route is found, this will run
app.use(function (req, res, next) {
  const e = new ExpressError("Page Not Found", 404);
  return next(e);
});

//error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message,
  });
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
