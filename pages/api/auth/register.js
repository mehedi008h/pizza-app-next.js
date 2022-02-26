import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect';

import { registerUser } from '../../../controller/authController';

import onError from '../../../middleware/errors';

const handler = nc({ onError });

dbConnect();

handler.post(registerUser);

export default handler;