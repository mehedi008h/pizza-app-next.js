import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middleware/errors';
import { deletePizza, getSinglePizza, updatePizza } from '../../../controller/productController';


const handler = nc({ onError });

dbConnect();

handler.get(getSinglePizza);
handler.put(updatePizza);
handler.delete(deletePizza);

export default handler;