const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    if (typeof next === "function") {
      next();
    } else {
      console.error("Next is not a function in validate middleware");
      res.status(500).json({ success: false, message: "Internal Server Middleware Error" });
    }
  } catch (error) {
    const errorMessages = error.errors ? error.errors.map((err) => ({
      path: err.path[err.path.length - 1],
      message: err.message,
    })) : [{ path: "unknown", message: error.message }];

    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: errorMessages,
    });
  }
};

module.exports = validate;
