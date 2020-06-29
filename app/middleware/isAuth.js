const { generateToken } = require('./utils')
const jwt = require('jsonwebtoken')
const { signature } = require('../config')
const UserTable = require('../models/UserTable')

module.exports = async (req, res, next) => {
  try {
    const { data: { id }} = await jwt.verify(req.headers.authorization, signature);
    const currentUser = await UserTable.getUser({ criterion: 'id', value: id })
    if(!currentUser) {
      res.status(403).json({ error: 'Access forbidden' })
    } else {
      req.currentUser = currentUser
      next()
    }
  } catch (e) {
    res.status(403).json({ error: 'Access forbidden' })
  }
}