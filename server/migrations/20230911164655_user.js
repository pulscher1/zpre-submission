/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_table', table => {
        table.increments('id'); 
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('username');
        table.string('password');
        table.timestamps(true, true); // adds created_at and updated_at
      });
    };


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};