exports.up = function(knex) {
    return knex.schema.createTable('admin', function(table) {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('email').unique().notNullable();
      table.string('telefone');
      table.string('senha').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('admin');
  };
