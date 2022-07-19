// Update with your config settings.
/* const { db } = require('./.env') */

module.exports = {
  client: 'postgresql',
  connection: {
    database: 'usuario',
    user: 'postgres',
    password: ''
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};
