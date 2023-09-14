/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('item').del()
  await knex('item').insert([
      { id: 1, user_id: 1, item_name: 'milk', description: '2%', quantity: 1 },
      { id: 2, user_id: 2, item_name: 'eggs', description: 'large', quantity: 1 },
      { id: 3, user_id: 3, item_name: 'bread', description: 'white', quantity: 1 },
      { id: 4, user_id: 4, item_name: 'butter', description: 'unsalted', quantity: 1},
      { id: 5, user_id: 5, item_name: 'cheese', description: 'cheddar', quantity: 1},
  ]);
};
