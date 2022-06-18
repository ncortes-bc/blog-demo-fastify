import { client } from '../../db';

export default async function (
  email: string,
  username: string,
  passHash: string,
  sigSalt: string
) {
  try {
    await client.query(
      'INSERT INTO users(email, username, passHash, sigSalt) VALUES ($1, $2, $3, $4)',
      [email, username, passHash, sigSalt] //Issuing queries like this protects against sql injection
    );
    console.log(`User ${username} registered.`);
  } catch (err) {
    throw err;
  }
}
