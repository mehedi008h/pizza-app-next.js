import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { newOrder } from '../../../controller/orderController';


import { isAuthenticatedUser } from '../../../middleware/auth';
import onError from '../../../middleware/auth';

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser)
    .post(newOrder)

export default handler;