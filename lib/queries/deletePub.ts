const { client } = require('../../db');

async function deletePub(userId: number, pubId: number) {
  try {
    //Avoids making 2 requests to db by checking for matching user id within the query
    const { rowCount } = await client.query(
      'DELETE FROM pubs WHERE id = $1 AND author = $2',
      [pubId, userId]
    );
    //Precisely one post should be deleted per query...
    if (rowCount < 1)
      throw `Publication #${pubId} does not belong to user #${userId}`;
  } catch (err) {
    throw err;
  }
}

export { deletePub };
