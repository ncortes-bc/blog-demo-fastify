const { client } = require('../../db');

async function getUser(email: string) {
  try {
    return (await client.query('SELECT * FROM users WHERE email = $1', [email]))
      ?.rows[0];
  } catch (err) {
    throw err;
  }
}

export { getUser };
