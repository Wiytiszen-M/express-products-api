const errorHandler = (err, req, res) => {
  console.error(err);

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err.code === "23505") {
    return res.status(409).json({
      success: false,
      message: "Resource already exists",
    });
  }

  if (err.code === "23503") {
    return res.status(400).json({
      success: false,
      message: "Invalid related resource",
    });
  }

  if (err.code === "22P02") {
    return res.status(400).json({
      success: false,
      message: "Invalid value format",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

module.exports = errorHandler;
