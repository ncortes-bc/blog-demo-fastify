import verifyToken from '../../lib/auth/verifyToken';

const options = {
  schema: {
    description:
      'Logs user out of blog.\n\nThis clears the JWT from the user\'s browser. Note: this is a browser-specific logout; other browsers with valid JWTs remain logged in (see "/logout-all" for information about universal logouts).',
    response: {
      default: { $ref: 'JSONmessage' },
    },
  },
};

async function handler(req: any, res: any, done: Function) {
  return res
    .clearCookie('authToken')
    .status(200)
    .send({ message: 'Successfully logged out' });
}

export { handler as default, options };
