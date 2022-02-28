import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middleware/errors';
import { deletePizza, updatePizza } from '../../../controller/productController';


const handler = nc({ onError });

dbConnect();

handler.put(updatePizza);
handler.delete(deletePizza);

export default handler;