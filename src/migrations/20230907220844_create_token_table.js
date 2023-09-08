exports.up = function(knex) {
  return knex.schema.createTable('token', function(table) {
    table.string('token');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('token');
}