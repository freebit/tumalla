const ServerError = require('../types/ServerError')

module.exports = (err, req, res, next) => {
  console.error(err);
  const stack = err.stack.split(/\n/)
  res.status(500).json({ message: err.message, stack: stack[1].trim() });
}