import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';
import { deleteOrder, updateOrder } from '../../../../controller/orderController';
import { authorizeRoles, isAuthenticatedUser } from '../../../../middleware/auth';

import onError from '../../../../middleware/errors';


const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateOrder);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteOrder);

export default handler;