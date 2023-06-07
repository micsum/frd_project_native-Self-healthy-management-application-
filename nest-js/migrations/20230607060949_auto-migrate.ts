import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('workout'))) {
    await knex.schema.createTable('workout', (table) => {
      table.increments('id');
      table.text('title').notNullable();
      table.text('href').notNullable();
      table.text('cover_image').notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable('workout_day'))) {
    await knex.schema.createTable('workout_day', (table) => {
      table.increments('id');
      table
        .integer('workout_id')
        .unsigned()
        .notNullable()
        .references('workout.id');
      table.text('title').notNullable();
      table.jsonb('headers').notNullable();
      table.jsonb('rows').notNullable();
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('workout_day');
  await knex.schema.dropTableIfExists('workout');
}
