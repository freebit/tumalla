const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const { signature, tokenExpiration } = require('../config')

async function hash(str) {
  return await argon2.hash(str)
}

async function checkHash(hashOne, hashTwo) {
  return await argon2.verify(hashOne, hashTwo)
}

function generateToken (user) {
  const data = {
    id: user.id,
    logname: user.login
  }
  return jwt.sign({ data, }, signature, { expiresIn: tokenExpiration });
}

module.exports = {
  hash,
  checkHash,
  generateToken
}