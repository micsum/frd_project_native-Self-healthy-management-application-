import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('meal_food_item', (table) => {
    table.dropTimestamps();
  });
  await knex.schema.table('meal_input_record', (table) => {
    table.dropTimestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('meal_food_item', (table) => {
    table.timestamps(false, true);
  });
  await knex.schema.table('meal_input_record', (table) => {
    table.timestamps(false, true);
  });
}
