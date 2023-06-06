import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('user', (table) => {
    table.decimal('height');
    table.decimal('weight');
    table.string('target');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('user', (table) => {
    table.dropColumn('height');
    table.dropColumn('weight');
    table.dropColumn('target');
  });
}
