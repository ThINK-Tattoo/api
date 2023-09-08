exports.up = function(knex) {
  return knex.schema.createTable('produtoEstoque', function(table){
    table.increments('id').primary();
    table.string('nomeItem');
    table.string('descricaoItem');
    table.date('dataValidadeItem');
    table.date('dataCompraItem');
    table.integer('quantidadeItem');
  })
};


exports.down = function(knex) {
  return knex.schema.dropTable('produtoEstoque');
};
