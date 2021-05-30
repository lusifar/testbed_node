exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTableIfNotExists('blogs', (table) => {
      table.increments();
      table.string('author').notNullable();
      table.string('title').notNullable();
      table.string('content').notNullable();
    }),
    knex.schema.createTableIfNotExists('users', (table) => {
      table.increments();
      table.string('username').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable('blogs'), knex.schema.dropTable('users')]);
};
