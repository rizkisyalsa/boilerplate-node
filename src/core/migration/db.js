const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'onboarding',
  password: '12345',
  port: 5432,
})

module.exports = {
  client
}