// knexfile.js
module.exports = {
    development: {
    client: 'mysql2', 
    connection: {
      host: 'roundhouse.proxy.rlwy.net', 
      user: 'root',
      password: '5dcd3GgGbGA1eB1-2-f52-1dd2BFDBa2',
      database: 'railway',
      port: 28392,
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
  