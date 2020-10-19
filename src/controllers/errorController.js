module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  res.status(statusCode).send({
    status: status,
    message: err.message,
  });
};
