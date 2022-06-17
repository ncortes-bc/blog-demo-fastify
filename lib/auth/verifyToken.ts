const { getUser } = require('../queries/getUser');
const jwt = require('jsonwebtoken');

async function verifyToken(req: any, res: any, done: Function) {
  try {
    const authToken = req.unsignCookie(req.cookies.authToken).value;
    const user = getUser(jwt.decode(authToken).email);
    const valid = jwt.verify(
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

export { verifyToken };
