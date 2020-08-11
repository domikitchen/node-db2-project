
exports.up = function(knex) {
  return knex.schema
    .createTable('cars', tbl => {
        tbl.increments();
        tbl.string('VIN', 7).notNullable().unique();
        tbl.string('make', 100).notNullable();
        tbl.string('modle', 100).notNullable();
        tbl.integer('mileage').notNullable().defaultTo(0);
        tbl.bool('clean').defaultTo(null);
        tbl.bool('salvage').defaultTo(null);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
