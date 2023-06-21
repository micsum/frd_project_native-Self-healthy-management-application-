import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_relationship');
  await knex.schema.dropTableIfExists('text_message');
  await knex.schema.dropTableIfExists('role_registration');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.createTable('role_registration', (table) => {
    table.increments('id');
    table.integer('user_id').unsigned().notNullable().references('user.id');
    table.string('profession').notNullable();
    table.timestamps(false, true);
  });

  await knex.schema.createTable('user_relationship', (table) => {
    table.increments('id');
    table.integer('advisor').unsigned().notNullable().references('user.id');
    table.integer('client').unsigned().notNullable().references('user.id');
    table.boolean('client_invite').notNullable();
    table.boolean('accepted').notNullable();
    table.string('rejected_reason').nullable();
    table.timestamps(false, true);
  });

  await knex.schema.createTable('text_message', (table) => {
    table.increments('id');
    table
      .integer('relationship_id')
      .unsigned()
      .notNullable()
      .references('user_relationship.id');
    table.integer('from').notNullable();
    table.timestamp('sent_at').notNullable();
    table.timestamp('read_at').notNullable();
    table.string('message').notNullable();
    table.timestamps(false, true);
  });
}
