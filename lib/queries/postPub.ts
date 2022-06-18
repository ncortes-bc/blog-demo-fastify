import { client } from '../../db';

export default async function (user: any, pub: any) {
  try {
    await client.query(
      'INSERT INTO pubs(author, title, content) VALUES ($1, $2, $3)',
      [user.id, pub.title, pub.content]
    );
  } catch (err) {
    throw err;
  }
}
