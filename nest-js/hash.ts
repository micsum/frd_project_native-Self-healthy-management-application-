import * as bcrypt from 'bcryptjs';

const ROUND = 12;

export async function hashPassword(password: string): Promise<string> {
  const hash: string = await bcrypt.hash(password, ROUND);
  return hash;
}

export async function checkPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const isMatched: boolean = await bcrypt.compare(password, hashedPassword);
  return isMatched;
}
