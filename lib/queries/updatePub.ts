const { client } = require('../../db');

async function postPub(user: any, pub: any) {
  try {
    await client.query(
      'UPDATE INTO pubs(author, title, content) VALUES ($1, $2, $3)',
      [user.id, pub.title, pub.content]
    );
  } catch (err) {
    throw err;
  }
}

export { postPub };
