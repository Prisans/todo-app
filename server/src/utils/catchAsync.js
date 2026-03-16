const catchAsync = (fn) => (req, res, next) => {
  if (typeof next !== "function") {
    console.error("CatchAsync: next is not a function!");
  }
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (typeof next === "function") {
      next(err);
    } else {
      console.error("CatchAsync: Cannot call next(err) because next is not a function", err);
    }
  });
};

module.exports = catchAsync;
