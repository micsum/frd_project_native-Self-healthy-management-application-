import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('personal_target_input', (table) => {
    table.increments('id');
    table.integer('user_id').notNullable();
    table.string('target_type').notNullable();
    table.decimal('weight_target').notNullable();
    table.date('start_date').notNullable();
    table.date('expected_date').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('personal_target_input');
}
