const knex = require('knex');
const knexConfig = require('../../knexfile.js'); // Importa as configurações do knexfile.js

// Cria a conexão com o banco de dados usando as configurações do knexfile.js
const db = knex(knexConfig.development);

// Exporta a conexão do banco de dados
module.exports = db;