import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('weight_record', (table) => {
    table.increments('id');
    table.integer('user_id').unsigned().notNullable().references('user.id');
    table.decimal('weight').notNullable();
    table.date('date').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('weight_record');
}
