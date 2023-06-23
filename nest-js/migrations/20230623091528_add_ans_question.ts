import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('chatroom_message', async (table) => {
    table.text('question').notNullable();
    table.text('answer').notNullable();
    table.dropColumn('text');
    table.dropColumn('chatroom_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('chatroom_message', async (table) => {
    table.dropColumn('answer');
    table.dropColumn('question');
    table.integer('chatroom_id');
    table.text('text');
  });
}
