import decodeCursor from '../../utils/decodeCursor';
import encodeCursor from '../../utils/encodeCursor';
import { client } from '../../db';

export default async function (args: any) {
  try {
    let { userId, cursor } = args;
    if (cursor) cursor = decodeCursor(cursor);
    cursor = cursor
      ? cursor
      : { timestamp: new Date(Date.now()), lastId: 9999999 };
    let results = [];
    if (userId) {
      results = (
        await client.query(
          `SELECT * FROM pubs WHERE author = $1 AND creation_ts < $2 AND id < $3 ORDER BY id LIMIT $4`,
          [
            userId,
            cursor.timestamp,
            cursor.lastId,
            Math.min(cursor.limit ? cursor.limit : 25, 25),
          ]
        )
      ).rows;
    } else {
      results = (
        await client.query(
          `SELECT * FROM pubs WHERE creation_ts < $1 AND id < $2 ORDER BY id LIMIT $3`,
          [
            cursor.timestamp,
            cursor.lastId,
            Math.min(cursor.limit ? cursor.limit : 25, 25),
          ]
        )
      ).rows;
    }
    cursor.lastId = results[0]?.id || 9999999;
    cursor = encodeCursor(cursor);
    return { cursor: cursor, pubs: results };
  } catch (err) {
    throw err;
  }
}
