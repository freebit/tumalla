const UserTable = require('../models/UserTable')

module.exports = async (req, res, next) => {
  const { logname } = req.body
  req.currentUser = await UserTable.getUser({ criterion: 'login', value: logname })
  next()
}