import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('personal_target_input', (table) => {
    table.integer('user_id').nullable().alter();
    table.string('target_type').nullable().alter();
    table.decimal('weight_target').nullable().alter();
    table.date('start_date').nullable().alter();
    table.date('expected_date').nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('personal_target_input', (table) => {
    table.integer('user_id').notNullable().alter();
    table.string('target_type').notNullable().alter();
    table.decimal('weight_target').notNullable().alter();
    table.date('start_date').notNullable().alter();
    table.date('expected_date').notNullable().alter();
  });
}
