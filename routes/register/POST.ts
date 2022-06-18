import bc from 'bcrypt';
import createUser from '../../lib/queries/createUser';

const options = {
  schema: {
    description:
      'Register a new user.\n\nRequests should contain the user\'s email, username, password ("pass"), and password-check ("passCheck"). Password and password-check must match. Applicant email and username must be unique.',
    response: {
      default: {
        $ref: 'JSONmessage#',
      },
    },
  },
};

async function handler(req: any, res: any, done: Function) {
  const { email, username, pass, passCheck } = req.body;
  if (!(email && username && pass && passCheck)) {
    return res.status(400).send({ message: 'Missing information' });
  }
  if (pass != passCheck) {
    return res.status(400).send({ message: 'Passwords do not match' });
  }
  const passHash = bc.hash(pass, 5);
  const sigSalt = bc.genSalt(5); //sigSalt is concatenated to the server's secret key before signing a user's JWT.
  //Changing a users sigSalt renders all of the user's previously-issued JWTs invalid (universal logout).
  //See lib/queries/universalLogout.ts for more :)

  try {
    await createUser(email, username, await passHash, await sigSalt);
    return res.status(200).send({ message: 'User succesfully registered' });
  } catch (err) {
    return res.status(400).send({ message: `Error registering user: ${err}` });
  }
}

export { handler as default, options };
