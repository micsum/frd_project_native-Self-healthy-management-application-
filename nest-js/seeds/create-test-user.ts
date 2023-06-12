import { hashPassword } from '../hash';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user').del();

  // Inserts seed entries
  await knex('user').insert([
    {
      id: 1,
      email: 'test@test.com',
      username: 'test',
      password: await hashPassword('12345678'),
      weight: '60',
      height: '170',
      target: 'lose_weight',
    },
  ]);
}
