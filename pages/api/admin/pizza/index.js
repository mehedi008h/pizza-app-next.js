import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';
import { allAdminPizza } from '../../../../controller/productController';

import onError from '../../../../middleware/errors';


const handler = nc({ onError });

dbConnect();

handler.get(allAdminPizza)

export default handler;