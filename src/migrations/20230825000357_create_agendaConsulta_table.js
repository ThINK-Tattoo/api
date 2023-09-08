exports.up = function(knex) {
  return knex.schema.createTable('agendaConsulta', function(table) {
    table.increments('id').primary();
    table.integer('idCliente').unsigned().notNullable();
    table.string('nomeCliente');
    table.string('tellCliente');
    table.string('tamanhoTattoo');
    table.float('estOrcamento'); 
    table.date('dataTattoo');
    table.time('hTattoo');
    table.string('observacoes');
    table.string('fotoReferencia');
    table.string('status');
    table.string('tipoTattoo');

    table.foreign('idCliente').references('id').inTable('cliente');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('agendaConsulta');
};
