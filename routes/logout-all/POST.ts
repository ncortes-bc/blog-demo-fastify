import verifyToken from '../../lib/auth/verifyToken';
import universalLogout from '../../lib/queries/universalLogout';

const options = {
  schema: {
    description:
      'Logs user out of all browsers.\n\nThis endpoint performs a universal logout, invalidating all JWTs previously issued to the user.',
    response: {
      default: {
        $ref: 'JSONmessage#',
      },
    },
  },
  preHandler: verifyToken,
};

async function handler(req: any, res: any, done: Function) {
  try {
    await universalLogout(req.user.email);
    return res
      .clearCookie('authToken')
      .status(200)
      .send({ message: 'Successfully logged out' });
  } catch (err) {
    return res.status(400).send({ message: `Internal error: ${err}` });
  }
}

export { handler as default, options };
