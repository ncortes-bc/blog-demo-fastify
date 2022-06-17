import { verifyToken } from '../../../../lib/auth/verifyToken';
import { deletePub } from '../../../../lib/queries/deletePub';

const options = {
  schema: {
    description:
      'Delete a publication from the database.\n\nThis request must come from the author of the publication. Must hold valid JWT in cookie "authToken" (see "/login").',
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
