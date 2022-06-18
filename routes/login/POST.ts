import * as bc from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import getUser from '../../lib/queries/getUser';

let options = {
  schema: {
    description:
      "Logs user into blog.\n\nGiven valid credentials, the server stores a JWT in the the client's cookies. This token is needed for posting and deleting publications.",
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

    const user = getUser(email);
    //Check if user exists/hashwords match
    if (!(await user) || !(await bc.compare(pass, (await user).passhash))) {
      return res
        .status(400)
        .send({ message: 'Invalid email/password combination' });
    }

    const saltedKey = process.env.SECRET_KEY + (await user).sigsalt; //There are no limitations to the size of HMAC secret keys
    const authToken = jwt.sign(
      { id: (await user).id, email: (await user).email },
      saltedKey,
      {
        expiresIn: (extendedLogin && '30d') || '1d',
      }
    );
    return res //Store a JWT in the user's cookies :)
      .setCookie('authToken', authToken, { signed: true })
      .status(200)
      .send({ message: 'Successfully logged in' });
  } catch (err) {
    return res.status(400).send({ message: `Interntal error: ${err}` });
  }
}

export { handler as default, options };
