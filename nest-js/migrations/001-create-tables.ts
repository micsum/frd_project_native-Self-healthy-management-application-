import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('user'))) {
    await knex.schema.createTable('user', table => {
      table.increments('id')
      table.string('email').notNullable().unique()
      table.string('username').notNullable()
      table.string('password').notNullable()
      table.string('phone_number').notNullable().unique()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('meal_input_record'))) {
    await knex.schema.createTable('meal_input_record', table => {
      table.increments('id')
      table.date('date_of_meal').notNullable()
      table.integer('user_id').unsigned().notNullable().references('user.id')
      table.string('meal_time').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('role_registration'))) {
    await knex.schema.createTable('role_registration', table => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('user.id')
      table.string('profession').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('calendar_event'))) {
    await knex.schema.createTable('calendar_event', table => {
      table.date('end_date').notNullable()
      table.boolean('alert').notNullable()
      table.integer('user_id').unsigned().notNullable().references('user.id')
      table.increments('id')
      table.date('start_date').notNullable()
      table.string('information').nullable()
      table.string('event_type').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('user_relationship'))) {
    await knex.schema.createTable('user_relationship', table => {
      table.increments('id')
      table.integer('advisor').unsigned().notNullable().references('user.id')
      table.integer('client').unsigned().notNullable().references('user.id')
      table.boolean('client_invite').notNullable()
      table.boolean('accepted').notNullable()
      table.string('rejected_reason').nullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('exercise_history'))) {
    await knex.schema.createTable('exercise_history', table => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('user.id')
      table.timestamp('event_datetime').notNullable()
      table.decimal('burnt_calories').notNullable()
      table.string('event_name').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('text_message'))) {
    await knex.schema.createTable('text_message', table => {
      table.increments('id')
      table.integer('relationship_id').unsigned().notNullable().references('user_relationship.id')
      table.integer('from').notNullable()
      table.timestamp('sent_at').notNullable()
      table.timestamp('read_at').notNullable()
      table.string('message').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('meal_food_item'))) {
    await knex.schema.createTable('meal_food_item', table => {
      table.decimal('sugar_g').notNullable()
      table.integer('meal_id').unsigned().notNullable().references('meal_input_record.id')
      table.increments('id')
      table.decimal('calories').notNullable()
      table.decimal('serving_size_g').notNullable()
      table.decimal('fat_total_g').notNullable()
      table.decimal('fat_saturated_g').notNullable()
      table.decimal('protein_g').notNullable()
      table.decimal('sodium_mg').notNullable()
      table.decimal('potassium_mg').notNullable()
      table.decimal('cholesterol_mg').notNullable()
      table.decimal('carbohydrates_total_g').notNullable()
      table.decimal('fiber_g').notNullable()
      table.string('name').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('scrapped_website'))) {
    await knex.schema.createTable('scrapped_website', table => {
      table.increments('id')
      table.string('href').notNullable().unique()
      table.string('image_src').notNullable().unique()
      table.string('title').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('table'))) {
    await knex.schema.createTable('table', table => {
      table.increments('id')
      table.integer('scrapped_website_id').unsigned().notNullable().references('scrapped_website.id')
      table.string('title').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('row_info'))) {
    await knex.schema.createTable('row_info', table => {
      table.increments('id')
      table.integer('table_id').unsigned().notNullable().references('table.id')
      table.integer('row_index').notNullable()
      table.string('header').notNullable()
      table.string('sub_info').notNullable()
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('row_info')
  await knex.schema.dropTableIfExists('table')
  await knex.schema.dropTableIfExists('scrapped_website')
  await knex.schema.dropTableIfExists('meal_food_item')
  await knex.schema.dropTableIfExists('text_message')
  await knex.schema.dropTableIfExists('exercise_history')
  await knex.schema.dropTableIfExists('user_relationship')
  await knex.schema.dropTableIfExists('calendar_event')
  await knex.schema.dropTableIfExists('role_registration')
  await knex.schema.dropTableIfExists('meal_input_record')
  await knex.schema.dropTableIfExists('user')
}
