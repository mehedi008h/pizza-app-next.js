import Order from '../models/order';

import ErrorHandler from '../utils/errorHandler'
import catchAsyncErrors from '../middleware/catchAsyncErrors';;

// Create a new order   =>  /api/order/new
const newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice

    } = req.body;
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})

export {
    newOrder
}