exports.up = function(knex) {
  return knex.schema.createTable('confirmaFlashTattoo', function(table){
    table.increments('id').primary();
    table.integer('idAdmin').unsigned().notNullable();
    table.string('nome');
    table.string('tamanho');
    table.string('local');
    table.string('tipo');
    table.string('cores');
    table.double('valor1');
    table.double('valor2');
    table.double('valor3');
    table.string('imagem');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('confirmaFlashTattoo');
};
