import { client } from '../../db';

export default async function (pubId: number) {
  try {
    return (await client.query('SELECT * FROM pubs WHERE id = $1', [pubId]))
      .rows[0];
  } catch (err) {
    throw err;
  }
}
