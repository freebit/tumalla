const DBClient = require('../dbClient.js')
const chalk = require('chalk')

class SlideTable {

  constructor(dbClient) {
    this.dbClient = dbClient
    this.tableName = 'slides'
  }

  async getAll () {
    return this.dbClient.client.query(`SELECT * from slides`)
  }

  async createTable() {
    if (!this.dbClient.connected) return

    const query = `
    CREATE TABLE IF NOT EXISTS ${this.tableName} (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      caption varchar(255),
      patch varchar(255)
    );`

    await this.dbClient.client.query(query)
    .then(() => {
      console.log(chalk.bgBlue.white(` PostgreSql client successfully create table "${this.tableName}"! `))
    })
    .catch((err) => {
      console.log(chalk.bgRed.black(` PostgreSql client create table ${this.tableName} error -`), err)
    });
  }
}

module.exports = new SlideTable(DBClient)