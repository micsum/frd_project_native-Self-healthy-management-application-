import { hashPassword } from '../hash';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('meal_food_item').del();
  await knex('meal_input_record').del();
  await knex('user').del();

  // Inserts seed entries
  const [{ id }] = await knex('user')
    .insert([
      {
        email: 'test@test.com',
        username: 'test',
        password: await hashPassword('12345678'),
        weight: '60',
        height: '170',
        target: 'lose_weight',
      },
    ])
    .returning('id');

  const mealIDResult = await knex('meal_input_record')
    .insert([
      {
        date_of_meal: new Date(),
        user_id: id,
        meal_time: 'breakfast',
      },
      {
        date_of_meal: new Date(),
        user_id: id,
        meal_time: 'lunch',
      },
      {
        date_of_meal: new Date(),
        user_id: id,
        meal_time: 'dinner',
      },
    ])
    .returning('id');

  const mealIDList = mealIDResult.map((meal) => meal.id);

  await knex('meal_food_item').insert([
    {
      meal_id: mealIDList[0],
      name: 'bread',
      calories: 261.6,
      serving_size_g: 100,
      fat_total_g: 3.4,
      fat_saturated_g: 0.7,
      protein_g: 8.8,
      sodium_mg: 495,
      potassium_mg: 98,
      cholesterol_mg: 0,
      carbohydrates_total_g: 50.2,
      fiber_g: 2.7,
      sugar_g: 5.7,
      saved_size_unit: 'g',
    },
    {
      meal_id: mealIDList[0],
      name: 'milk',
      calories: 102.6,
      serving_size_g: 200,
      fat_total_g: 3.8,
      fat_saturated_g: 2.4,
      protein_g: 7,
      sodium_mg: 105,
      potassium_mg: 201,
      cholesterol_mg: 16,
      carbohydrates_total_g: 9.8,
      fiber_g: 0,
      sugar_g: 0,
      saved_size_unit: 'g',
    },
    {
      meal_id: mealIDList[0],
      name: 'egg',
      calories: 220.6,
      serving_size_g: 150,
      fat_total_g: 14.5,
      fat_saturated_g: 4.7,
      protein_g: 18.8,
      sodium_mg: 209,
      potassium_mg: 299,
      cholesterol_mg: 557,
      carbohydrates_total_g: 1.1,
      fiber_g: 0,
      sugar_g: 0.6,
      saved_size_unit: 'g',
    },
    {
      meal_id: mealIDList[1],
      name: 'pasta',
      calories: 467.9,
      serving_size_g: 300,
      fat_total_g: 2.8,
      fat_saturated_g: 0.5,
      protein_g: 17.2,
      sodium_mg: 3,
      potassium_mg: 174,
      cholesterol_mg: 0,
      carbohydrates_total_g: 94,
      fiber_g: 5.4,
      sugar_g: 1.7,
      saved_size_unit: 'g',
    },
    {
      meal_id: mealIDList[1],
      name: 'pork',
      calories: 472.3,
      serving_size_g: 200,
      fat_total_g: 27.9,
      fat_saturated_g: 9.9,
      protein_g: 52.5,
      sodium_mg: 115,
      potassium_mg: 439,
      cholesterol_mg: 176,
      carbohydrates_total_g: 0,
      fiber_g: 0,
      sugar_g: 0,
      saved_size_unit: 'g',
    },
    {
      meal_id: mealIDList[1],
      name: 'broccoli',
      calories: 69.9,
      serving_size_g: 200,
      fat_total_g: 0.8,
      fat_saturated_g: 0.2,
      protein_g: 4.8,
      sodium_mg: 82,
      potassium_mg: 131,
      cholesterol_mg: 0,
      carbohydrates_total_g: 14.6,
      fiber_g: 6.7,
      sugar_g: 2.8,
      saved_size_unit: 'g',
    },
    {
      meal_id: mealIDList[2],
      name: 'rice',
      calories: 382.2,
      serving_size_g: 300,
      fat_total_g: 0.8,
      fat_saturated_g: 0.2,
      protein_g: 8,
      sodium_mg: 3,
      potassium_mg: 127,
      cholesterol_mg: 0,
      carbohydrates_total_g: 85.3,
      fiber_g: 1.2,
      sugar_g: 0.2,
      saved_size_unit: 'g',
    },
    {
      meal_id: mealIDList[2],
      name: 'beef',
      calories: 583.8,
      serving_size_g: 200,
      fat_total_g: 39.4,
      fat_saturated_g: 15.6,
      protein_g: 53.2,
      sodium_mg: 127,
      potassium_mg: 412,
      cholesterol_mg: 175,
      carbohydrates_total_g: 0,
      fiber_g: 0,
      sugar_g: 0,
      saved_size_unit: 'g',
    },
    {
      meal_id: mealIDList[2],
      name: 'carrot',
      calories: 50.9,
      serving_size_g: 150,
      fat_total_g: 0.3,
      fat_saturated_g: 0,
      protein_g: 1.1,
      sodium_mg: 85,
      potassium_mg: 45,
      cholesterol_mg: 0,
      carbohydrates_total_g: 12.4,
      fiber_g: 4.6,
      sugar_g: 5.2,
      saved_size_unit: 'g',
    },
  ]);
}
