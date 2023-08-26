// knexfile.js
module.exports = {
    development: {
    client: 'mysql', 
    connection: {
      host: 'localhost', 
      user: 'root',
      password: '',
      database: 'think'
    },
      migrations: {
        directory: './src/migrations'
      },
      useNullAsDefault: true
    }
  };
  