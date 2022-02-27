import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';
import { allAdminPizza } from '../../../../controller/productController';
import { authorizeRoles, isAuthenticatedUser } from '../../../../middleware/auth';



import onError from '../../../../middleware/errors';


const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .get(allAdminPizza)

export default handler;