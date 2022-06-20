/**
 * @api {get} /ping Health checkpoint.
 * @apiGroup Authentication
 * @apiSuccess {String} message Message confirming successful login.
 */

const options = {
  schema: {
    description: 'Health checkpoint.',
    response: {
      200: { $ref: 'JSONmessage' },
    },
  },
};

async function handler(req: any, res: any, done: Function) {
  return res.status(200).send({ message: 'Pong' });
}

export { handler as default, options };
