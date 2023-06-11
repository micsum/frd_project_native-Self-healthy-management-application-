import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('row_info');
  await knex.schema.dropTableIfExists('table');
  await knex.schema.dropTableIfExists('scrapped_website');
}

export async function down(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('scrapped_website'))) {
    await knex.schema.createTable('scrapped_website', (table) => {
      table.increments('id');
      table.string('href').notNullable().unique();
      table.string('image_src').notNullable().unique();
      table.string('title').notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable('table'))) {
    await knex.schema.createTable('table', (table) => {
      table.increments('id');
      table
        .integer('scrapped_website_id')
        .unsigned()
        .notNullable()
        .references('scrapped_website.id');
      table.string('title').notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable('row_info'))) {
    await knex.schema.createTable('row_info', (table) => {
      table.increments('id');
      table.integer('table_id').unsigned().notNullable().references('table.id');
      table.integer('row_index').notNullable();
      table.string('header').notNullable();
      table.string('sub_info').notNullable();
      table.timestamps(false, true);
    });
  }
}
