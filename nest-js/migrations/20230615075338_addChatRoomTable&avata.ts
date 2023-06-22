import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user', (table) => {
    table.string('avatar');
  });
  if (!(await knex.schema.hasTable('chatroom'))) {
    await knex.schema.createTable('chatroom', (table) => {
      table.increments('id');
      table
        .integer('member1_id')
        .unsigned()
        .notNullable()
        .references('user.id');
      table
        .integer('member2_id')
        .unsigned()
        .notNullable()
        .references('user.id');
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable('chatroom_message'))) {
    await knex.schema.createTable('chatroom_message', (table) => {
      table.increments('id');
      table
        .integer('chatroom_id')
        .unsigned()
        .notNullable()
        .references('chatroom.id');
      table.integer('user_id').unsigned().notNullable().references('user.id');
      table.text('text').notNullable();
      table.timestamp('created_at').notNullable();
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('chatroom_message');
  await knex.schema.dropTableIfExists('chatroom');

  await knex.schema.alterTable('user', (table) => {
    table.dropColumn('avatar');
  });
}
