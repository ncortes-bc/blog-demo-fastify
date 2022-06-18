import { client } from '../../db';
const bc = require('bcrypt');

export default async function (email: string) {
  try {
    const sigSalt = await bc.genSalt(5);
    client.query('UPDATE users SET sigsalt = $1 WHERE email = $2', [
      sigSalt,
      email,
    ]);
  } catch (err) {
    throw err;
  }
}
