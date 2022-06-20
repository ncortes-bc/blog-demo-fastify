/**
 * @api {post} /login Login user.
 * @apiGroup Authentication
 * @apiBody {String} email User's email
 * @apiBody {String} pass User's password
 * @apiBody {Boolean} extendedLogin Boolean indicating whether the user desires a JWT which expires in 30 days (True) or 1 day (False)
 * @apiSuccess {String} message Message confirming successful login.
 */

import * as bc from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import getUser from '../../lib/queries/getUser';

let options = {
  schema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        pass: { type: 'string' },
        extendedLogin: { type: 'boolean' },
      },
    },
    response: {
      default: {
        $ref: 'JSONmessage#',
      },
    },
  },
};

async function handler(req: any, res: any, done: Function) {
  try {
    const { email, pass, extendedLogin } = req.body;

    //Check if email and password were supplied
    if (!(email && pass)) {
      return res
        .status(400)
        .send({ message: 'Please enter your email address and password' });
    }

    const user = await getUser(email).catch(() => null);

    //Check if user exists and hashwords match
    const result =
      (!user ? 'email' : false) ||
      (!(await bc.compare(pass, user.passhash)) ? 'password' : false);
    if (result) {
      return res.status(400).send({ message: `Invalid ${result}` });
    }

    const saltedKey = process.env.SECRET_KEY + user.sigsalt; //There are no limitations to the size of HMAC secret keys
    const authToken = jwt.sign({ id: user.id, email: user.email }, saltedKey, {
      expiresIn: (extendedLogin && '30d') || '1d',
    });
    return res //Store a JWT in the user's cookies :)
      .setCookie('authToken', authToken, { signed: true, httpOnly: true })
      .status(200)
      .send({ message: 'Successfully logged in' });
  } catch (err) {
    return res.status(400).send({ message: `Internal error: ${err}` });
  }
}

export { handler as default, options };
