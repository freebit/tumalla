const SlideTable = require('../models/SlideTable.js')
const UserTable = require('../models/UserTable.js')

module.exports = async () => {
  await UserTable.createTable()
  await SlideTable.createTable()
  await UserTable.createAdminUser()
}

