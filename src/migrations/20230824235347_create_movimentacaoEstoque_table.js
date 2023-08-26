exports.up = function(knex) {
  return knex.schema.createTable('movimentacaoEstoque', function(table){
    table.increments('id').primary();
    table.integer('idProduto').unsigned().notNullable();
    table.string('tipoMovimentacao');
    table.datetime('dataHora');
    table.integer('quantidade');

    table.foreign('idProduto').references('id').inTable('produtoEstoque');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('movimentacaoEstoque');
};
