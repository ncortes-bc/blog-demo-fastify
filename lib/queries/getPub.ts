const { client } = require('../../db');

async function getPub(pubId: number) {
  try {
    return (await client.query('SELECT * FROM pubs WHERE id = $1', [pubId]))
      .rows[0];
  } catch (err) {
    throw err;
  }
}

export { getPub };
