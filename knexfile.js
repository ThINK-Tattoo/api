// knexfile.js
require('dotenv').config();

module.exports = {
    development: {
    client: 'mysql2', 
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
    },
      migrations: {
        directory: './src/migrations'
      },
      useNullAsDefault: true,
      authentication: {
        authSwitchHandler: ({ pluginName, pluginData, connection }, cb) => {
          if (pluginName === 'caching_sha2_password') {
            // Se o método de autenticação for caching_sha2_password, use mysql_native_password
            return cb(null, Buffer.from([1]));
          }
          return cb(new Error('Unsupported auth plugin'));
        },
      },
    }
  };
  