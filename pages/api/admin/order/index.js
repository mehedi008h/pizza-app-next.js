import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';
import { allOrder } from '../../../../controller/orderController';

import onError from '../../../../middleware/errors';


const handler = nc({ onError });

dbConnect();

handler.get(allOrder);

export default handler;