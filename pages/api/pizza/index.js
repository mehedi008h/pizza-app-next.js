import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { newPizza } from '../../../controller/productController';
import onError from '../../../middleware/errors';




const handler = nc({ onError });

dbConnect();

handler.post(newPizza);

export default handler;