import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('personal_target_input', (table) => {
    table.integer('user_id').notNullable().alter();
    table.string('target_type').notNullable().alter();
    table.decimal('weight_target').notNullable().alter();
    table.date('start_date').notNullable().alter();
    table.date('expected_date').notNullable().alter();
  });

  await knex.schema.table('personal_target_input', (table) => {
    table.dropColumn('steps_dailygoal');
  });

  if (!(await knex.schema.hasTable('step_daily_goal'))) {
    await knex.schema.createTable('step_daily_goal', (table) => {
      table.increments('id');
      table.string('user_id').notNullable();
      table.integer('steps_dailygoal').notNullable().unique();
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('personal_target_input', (table) => {
    table.integer('user_id').nullable().alter();
    table.string('target_type').nullable().alter();
    table.decimal('weight_target').nullable().alter();
    table.date('start_date').nullable().alter();
    table.date('expected_date').nullable().alter();
  });

  await knex.schema.table('personal_target_input', (table) => {
    table.integer('steps_dailygoal').defaultTo(0);
  });

  await knex.schema.dropTableIfExists('step_daily_goal');
}
