const DBClient = require('../dbClient.js')
const chalk = require('chalk')
const { hash } = require('../middleware/utils.js')

class UserTable {

  constructor(dbClient) {
    this.dbClient = dbClient
    this.tableName = 'users'
    this.salt = 'tumalla'

    this.adminLogin = 'roman'
    this.adminPassword = 'roman&&chudoudo'
  }

  async getAll () {
    return this.dbClient.client.query(`SELECT * from slides`)
  }

  async createTable() {
    if (!this.dbClient.connected) return

    const query = `
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    CREATE TABLE IF NOT EXISTS ${this.tableName} (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      login varchar(128),
      password varchar(128)
    );`

    await this.dbClient.client.query(query)
    .then(() => {
      console.log(chalk.bgBlue.white(` PostgreSql client successfully create table "${this.tableName}"! `))
    })
    .catch((err) => {
      console.log(chalk.bgRed.black(` PostgreSql client create table ${this.tableName} error -`), err)
    });
  }

  async createAdminUser() {
    if (!this.dbClient.connected) return
    const admin = await this.getAdminUser()
    if (admin) {
      console.log(chalk.bgBlue.white(` Admin user allready exists !`))
      return
    }

    const passHash = await hash(`${this.adminPassword}`)
    const query = `
    INSERT INTO ${this.tableName} (login, password) VALUES (
      '${this.adminLogin}',
      '${passHash}'
    );`
    await this.dbClient.client.query(query)
    .then(() => {
      console.log(chalk.bgBlue.white(`* Admin successfully create !`))
    })
    .catch((err) => {
      console.log(chalk.bgRed.black(`* Admin create error -`), err)
    });
  }

  async getAdminUser() {
    if (!this.dbClient.connected) return
    const query = `
      SELECT * FROM ${this.tableName}
      WHERE login = '${this.adminLogin}';
    `
    const user = await this.dbClient.client.query(query)
    return user && user.rows && user.rows[0]
  }

  async getUser({ criterion, value }) {
    if(!this.dbClient.connected) return

    const query = `
      SELECT * FROM ${this.tableName}
      WHERE ${criterion} = '${value}';
    `
    const user = await this.dbClient.client.query(query)
    return user && user.rows && user.rows[0]

  }
}

module.exports = new UserTable(DBClient)