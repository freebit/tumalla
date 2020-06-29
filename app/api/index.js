const SlideTable = require('../models/SlideTable.js')

const isAuth = require('../middleware/isAuth')
const formDataParser = require('../middleware/formDataParser')
const attachUser = require('../middleware/attachUser')

const { checkHash, generateToken } = require('../middleware/utils')


module.exports = (app) => {

  app.get('/me', isAuth, (req, res, next) => {
    const { password, ...user } = req.currentUser
    res.status(200).json({ data: {...user}})
  })

  app.post('/login', formDataParser, attachUser, async (req, res, next) => {
    const { password } = req.body
    const { password: dbPassword } = req.currentUser
    const correctPassword = await checkHash(dbPassword, password)
    if(!req.currentUser){
      return res.status(401).json({ error: '401 - User not found' })
    }
    else if(!correctPassword) {
      return res.status(400).json({ error: '400 - Incorrect login or password' })
    } else {
      const { password, ...user } = req.currentUser
      res.status(200).json({ data: {...user, jwt: generateToken(user) }})
    }
  })

  app.get('/slides', isAuth, async (req, res, next) => {
    try {
      const { rows } = await SlideTable.getAll()
      res.json({ data: rows })
    } catch(e) {
      next(e)
    }
  })

}