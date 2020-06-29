const { Pool } = require('pg')
const chalk = require('chalk')

class DBClient {

  constructor() {
    this.databaseName = `tumalla`
    this.client = null
    this.connected = false

    this.pool = new Pool({
      user: 'tumalla',
      database: 'postgres',
      password: '123',
      host: 'localhost',
      port: 5432
    })
  }

  async startConnect (dataBase) {
    await this.pool.connect()
    .then((client) => {
      this.client = client
      this.connected = true
      console.log(chalk.bgGreen.black(` PostgreSql client successfully connected to database "${dataBase}"! `))
    })
    .catch((err) => console.log(chalk.bgRed.black(' PostgreSql client connection error -'), err))
  }

  async switchConnect (toDataBase) {
    this.pool = new Pool({
      user: 'tumalla',
      database: 'tumalla',
      password: '123',
      host: 'localhost',
      port: 5432
    })
    await this.startConnect(toDataBase)
  }

  async createDataBase () {
    if(!this.connected) return

    await this.client.query(`CREATE DATABASE ${this.databaseName}`)
    .then(() => {
      console.log(chalk.bgGreen.black(` database ${this.databaseName} is successfully created! `))
    })
    .catch((err) => {
      if(err.message.includes('already exists')) {
        console.log(chalk.bgGreen.black(` ${err.message}! `))
      } else {
        console.log(chalk.bgRed.black(` database creation error `), err.message)
      }
    })
  }

  async init () {
    try {
      await this.startConnect('postgres')
      await this.createDataBase()
      await this.switchConnect(this.databaseName)
    } catch(err) {
      console.log(chalk.bgRed.black(` database init error `), err)
    }
  }

}

module.exports = new DBClient()