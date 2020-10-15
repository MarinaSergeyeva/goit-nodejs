exports.validate = schema => {
  return (req, res, next) => {
    const validatedResult = schema.validate(req.body);
    if (validatedResult.error) {
      res.status(400).json({
        status: 'validation failed',
        message: validatedResult.error.message,
      });
      return;
    }
    next();
  };
};
