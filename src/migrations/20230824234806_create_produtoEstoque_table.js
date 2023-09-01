exports.up = function(knex) {
  return knex.schema.createTable('produtoEstoque', function(table){
    table.increments('id').primary();
    table.string('nome');
    table.string('descricao');
    table.date('dataValidade');
    table.date('dataCompra');
    table.integer('quantidade');
  })
};


exports.down = function(knex) {
  return knex.schema.dropTable('produtoEstoque');
};
