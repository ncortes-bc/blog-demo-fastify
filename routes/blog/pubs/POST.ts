/**
 * @api {post} /blog/pubs Publish an item.
 * @apiGroup Blog
 * @apiBody {String} title Desired title of the publication
 * @apiBody {String} content Main content of the publication
 * @apiSuccess {String} message Message indicating the publication was successful.
 * @apiSuccessExample  Example success message:
 * {
 * "message": "Publication with titel 'Networking 101' successfully uploaded."
 * }
 */

import verifyToken from '../../../lib/auth/verifyToken';
import postPub from '../../../lib/queries/postPub';

const options = {
  schema: {
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
      message: `Publication with title '${req.body.title}' successfully uploaded.`,
    });
  } catch (err) {
    return res.status(400).send({ message: `Internal error: ${err}` });
  }
}

export { handler as default, options };
