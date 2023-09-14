/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('item', table => {
        table.increments('id'); 
        table.integer('user_id').references('id').inTable('user_table');
        table.string('item_name');
        table.string('description');
        table.integer('quantity');
        table.timestamps(true, true); // adds created_at and updated_at
      });
    };


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
