exports.up = function(knex) {
    return knex.schema.createTable('statusAgenda', function(table){
      table.string('statusAgenda');
      table.date('dataFechamento');
      table.time('hFechamento');
    });
  };
  
  
  exports.down = function(knex) {
      return knex.schema.dropTable('statusAgenda');
  };
  