import { hashPassword } from '../hash';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries

  // Inserts seed entries
  await knex('user').insert([
    {
      email: 'chatGPT@test.com',
      username: 'chatGPT',
      password: await hashPassword('12345678'),
      weight: '10',
      height: '170',
      target: 'lose_weight',
    },
  ]);
}
