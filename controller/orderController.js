import Order from '../models/order';

import ErrorHandler from '../utils/errorHandler';
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

// Get all pizza - USER   =>   /api/admin/rooms
const allOrder = catchAsyncErrors(async (req, res) => {

    const orders = await Order.find();
    res.status(200).json({
        success: true,
        orders
    })

})

// Update / Process order - ADMIN  =>   /api/admin/order/:id
const updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.query.id)
    console.log(req.body);
    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderStatus = req.body,
        order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
    })
})

// Delete order   =>   /api/admin/order/:id
const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.query.id)

    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true
    })
})

export {
    newOrder,
    allOrder,
    updateOrder,
    deleteOrder
}