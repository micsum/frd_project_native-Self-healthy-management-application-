import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('mealplan'))) {
    await knex.schema.createTable('mealplan', (table) => {
      table.increments('id');
      table.string('slug', 100).notNullable().unique();
      table.text('title').notNullable();
      table.text('href').notNullable();
      table.text('cover_image').notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable('mealplan_day'))) {
    await knex.schema.createTable('mealplan_day', (table) => {
      table.increments('id');
      table
        .integer('mealplan_id')
        .unsigned()
        .notNullable()
        .references('mealplan.id');
      table.text('name').notNullable();
      table.text('cover_image').notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable('meal_content'))) {
    await knex.schema.createTable('meal_content', (table) => {
      table.increments('id');
      table
        .integer('mealplan_day_id')
        .unsigned()
        .notNullable()
        .references('mealplan_day.id');
      table.text('name').notNullable();
      table.integer('calories').notNullable();
      table.jsonb('foods').notNullable();
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('meal_content');
  await knex.schema.dropTableIfExists('mealplan_day');
  await knex.schema.dropTableIfExists('mealplan');
}
