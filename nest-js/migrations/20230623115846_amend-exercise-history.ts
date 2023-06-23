import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('exercise_history', (table) => {
    table.dateTime('started_at');
    table.dateTime('end_time');
    table.integer('event_duration');
  });

  await knex.schema.table('exercise_history', (table) => {
    table.dropColumn('event_datetime');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('exercise_history', (table) => {
    table.dropColumn('started_at');
    table.dropColumn('end_time');
    table.dropColumn('event_duration');
  });

  await knex.schema.table('exercise_history', (table) => {
    table.timestamp('event_datetime');
  });
}
