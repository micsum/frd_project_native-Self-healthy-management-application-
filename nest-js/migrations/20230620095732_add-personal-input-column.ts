import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('personal_target_input', (table) => {
    table.integer('steps_dailygoal').defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('personal_target_input', (table) => {
    table.dropColumn('steps_dailygoal');
  });
}
