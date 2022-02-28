import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { newPizza, allPizza } from '../../../controller/productController';
import onError from '../../../middleware/errors';




const handler = nc({ onError });

dbConnect();

handler.get(allPizza);
handler.post(newPizza);

export default handler;