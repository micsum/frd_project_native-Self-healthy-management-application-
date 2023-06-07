import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex('workout_day').delete();
  await knex('workout').delete();
  await knex.schema.alterTable('workout', (table) => {
    table.string('slug', 100).notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('workout', (table) => {
    table.dropColumn('slug');
  });
}
