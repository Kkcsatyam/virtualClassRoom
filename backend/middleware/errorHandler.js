// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    success: false,
    message: "Server Error",
  });
};

module.exports = errorHandler;
