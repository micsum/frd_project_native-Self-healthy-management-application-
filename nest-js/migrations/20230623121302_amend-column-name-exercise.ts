import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('exercise_history', (table) => {
    table.dropColumn('started_at');
  });

  await knex.schema.table('exercise_history', (table) => {
    table.dateTime('start_time');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('exercise_history', (table) => {
    table.dateTime('started_at');
  });

  await knex.schema.table('exercise_history', (table) => {
    table.dropColumn('start_time');
  });
}
