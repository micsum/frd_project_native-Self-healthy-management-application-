import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('meal_food_item', (table) => {
    table.string('saved_size_unit');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('meal_food_item', (table) => {
    table.dropColumn('saved_size_unit');
  });
}
