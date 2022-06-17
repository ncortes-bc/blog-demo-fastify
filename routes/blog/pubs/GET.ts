import { getPubs } from '../../../lib/queries/getPubs';

const options = {
  schema: {
    description:
      'Fetch a list of publications.\n\nTo specify which publications are of interest, a base64-encoded cursor may be provided in the querystring specifying an ISO-formatted date-time ("timestamp"); the ID of a publication, after which publications will be listed ("lastId", optional); and the list length ("limit", up to 25 publications per request). The server returns a list publications published BEFORE the specified timestamp. If no cursor is provided, the server automatically generates a cursor that fetches the most recent 25 publications. Included with every response is a cursor which conveniently progresses the "lastId" property.',
    params: { pubId: { type: 'number' } },
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
    const { cursor } = req.query;
    const pubs = await getPubs({ cursor: cursor });
    return res.status(200).send(pubs);
  } catch (err) {
    res.status(400).send({ message: `Error fetching publications: ${err}` });
  }
}

export { handler as default, options };
