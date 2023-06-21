import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('chatroom_message', (table) => {
    table.dropColumn('text');
    table.dropColumn('chatroom_id');
    table.text('question').notNullable();
    table.text('answer').notNullable();
  });
  await knex.schema.dropTableIfExists('chatroom');
}

export async function down(knex: Knex): Promise<void> {
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
    await knex.schema.alterTable('chatroom_message', (table) => {
      table.dropColumn('answer');
      table.dropColumn('question');
      table
        .integer('chatroom_id')
        .unsigned()
        .notNullable()
        .references('chatroom.id');
      table.text('text').notNullable();
    });
  }
}
