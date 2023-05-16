const errorMiddleware = (err, _req, res, _next) =>
  res.status(err.type).json({ message: err.message });

module.exports = errorMiddleware;