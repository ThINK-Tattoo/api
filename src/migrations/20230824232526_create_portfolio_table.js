exports.up = function(knex) {
    return knex.schema.createTable('portfolio', function(table){
      table.increments('id').primary();
      table.integer('idAdmin').unsigned().notNullable();
      table.string('nome');
      table.string('tamanho');
      table.string('local');
      table.string('tipo');
      table.string('cores');
      table.string('imagem');
      
      table.foreign('idAdmin').references('id').inTable('admin');
    })
  };
  
  
  exports.down = function(knex) {
    return knex.schema.dropTable('portfolio');
  };
