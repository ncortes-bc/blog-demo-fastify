import getPubs from '../../../../lib/queries/getPubs';
//const createCursor = require('./utils/createCursor');

const options = {
  schema: {
    description:
      'Fetch list of publications by user.\n\nA base-64 encoded cursor may be included in requests for pagination. See "/blog/pubs" for more information about cursors.',
    params: { userId: { type: 'number' } },
    querystring: { cursor: { type: 'string' } },
    response: {
      200: {
        $ref: 'publications#',
      },
      400: {
        $ref: 'JSONmessage#',
      },
    },
  },
};

async function handler(req: any, res: any) {
  try {
    const { userId } = req.params;
    const { cursor } = req.query;
    const pubs = await getPubs({ userId: userId, cursor: cursor });
    return res.status(200).send(pubs);
  } catch (err) {
    res.status(400).send({ message: `Error fetching publications: ${err}` });
  }
}

export { handler as default, options };
