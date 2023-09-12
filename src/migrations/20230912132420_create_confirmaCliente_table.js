
exports.up = function(knex) {
  return knex.schema.createTable('confirmaCliente', function(table) {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('telefone');
    table.string('email').unique().notNullable();
    table.integer('idade');
    table.string('senha').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('confirmaCliente');
};
