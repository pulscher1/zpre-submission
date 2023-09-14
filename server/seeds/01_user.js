/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('user_table').del()
  await knex('user_table').insert([
      { id: 1, first_name: 'John', last_name: 'Wick', username: 'johnwick', password: 'password1' },
      { id: 2, first_name: 'Jane', last_name: 'Doe', username: 'janedoe', password: 'password2' },
      { id: 3, first_name: 'Harry', last_name: 'Lee', username: 'harrylee', password: 'password3' },
      { id: 4, first_name: 'Ann', last_name: 'Winter', username: 'annwinter', password: 'password4'},
      { id: 5, first_name: 'George', last_name: 'Muller', username: 'georgemuller', password: 'password5'},
      { id: 6, first_name: 'Mary', last_name: 'Smith', username: 'marysmith', password: 'password6'},
  ]);
};
