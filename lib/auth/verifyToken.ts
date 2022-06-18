import getUser from '../queries/getUser';
import { decode, verify } from 'jsonwebtoken';

export default async function (req: any, res: any, done: Function) {
  try {
    const authToken = req.unsignCookie(req.cookies.authToken).value;
    const user = getUser((decode(authToken) as any).email);
    const valid = verify(
      authToken,
      process.env.SECRET_KEY + (await user).sigsalt
    );

    if (valid) {
      req.user = await user;
    } else {
      return res.status(400).send({ message: 'Bad authToken' });
    }
  } catch (err) {
    return res.status(400).send({ message: 'Invalid auth data' });
  }
}
