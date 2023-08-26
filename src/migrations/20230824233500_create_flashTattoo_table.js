exports.up = function(knex) {
  return knex.schema.createTable('flashTattoo', function(table){
    table.increments('id').primary();
    table.integer('idAdmin').unsigned().notNullable();
    table.string('imagem');
    table.string('tamanho');
    table.string('descricao');
    table.double('valor');
    table.string('estilo');

    table.foreign('idAdmin').references('id').inTable('admin');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('flashTattoo');
};
