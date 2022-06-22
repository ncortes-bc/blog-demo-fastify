import getPub from '../../../../lib/queries/getPub';

const options = {
  schema: {
    description: 'Fetch a specific publication by its ID.',
    params: { pubId: { type: 'number' } },
    response: {
      200: {
        $ref: 'publication#',
      },
      400: {
        $ref: 'JSONmessage#',
      },
    },
  },
};

async function handler(req: any, res: any) {
  try {
    const { pubId } = req.params;
    const publication = await getPub(pubId);
    if (!publication)
      return res
        .status(400)
        .send({ message: `Publication #${pubId} does not exist` });
    else return res.status(200).send(publication);
  } catch (err) {
    res.status(400).send({ message: `Error fetching publication: ${err}` });
  }
}

export { handler as default, options };
