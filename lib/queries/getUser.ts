import { client } from '../../db';

export default async function (email: string) {
  try {
    return (await client.query('SELECT * FROM users WHERE email = $1', [email]))
      ?.rows[0];
  } catch (err) {
    throw err;
  }
}
