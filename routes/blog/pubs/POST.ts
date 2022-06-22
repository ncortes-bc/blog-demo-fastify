import verifyToken from '../../../lib/auth/verifyToken';
import postPub from '../../../lib/queries/postPub';

const options = {
  schema: {
    description:
      'Post a publication.\n\nTitle and content should be provided. HTML formatting is supported. Must hold valid JWT in cookie "authToken" (see "/login").',
    params: { pubId: { type: 'number' } },
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        content: { type: 'string' },
      },
    },
    response: {
      default: {
        $ref: 'JSONmessage#',
      },
    },
  },
  preHandler: verifyToken,
};

async function handler(req: any, res: any) {
  try {
    await postPub(req.user, req.body);
    return res.status(200).send({
      message: `Publication with title '${req.body.title}' succesfully uploaded.`,
    });
  } catch (err) {
    return res.status(400).send({ message: `Internal error: ${err}` });
  }
}

export { handler as default, options };
