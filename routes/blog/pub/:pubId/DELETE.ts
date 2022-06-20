/**
 * @api {delete} /blog/pub/:pubId Delete a publication.
 * @apiGroup Blog
 * @apiParam {Number} pubId Publication ID
 * @apiSuccess {String} message Success message
 * @apiSuccessExample  Example success message:
 * {
 * "message": "Publication #15 successfully deleted.""
 * }
 */

import verifyToken from '../../../../lib/auth/verifyToken';
import deletePub from '../../../../lib/queries/deletePub';

const options = {
  schema: {
    params: { pubId: { type: 'number' } },
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
    await deletePub(req.user.id, req.params.pubId);
    res.status(200).send({
      message: `Publication #${req.params.pubId} successfully deleted.`,
    });
  } catch (err) {
    res.status(400).send({ message: `Error deleting publication: ${err}` });
  }
}

export { handler as default, options };
