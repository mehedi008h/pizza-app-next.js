import cloudinary from 'cloudinary';

import Pizza from "../models/product";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from '../middleware/catchAsyncErrors';


// Create new room, Admin   =>   /api/rooms
const newPizza = catchAsyncErrors(async (req, res) => {

    const images = req.body.images;

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {

        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'pizza/pizza',
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })

    }

    req.body.images = imagesLinks;
    req.body.user = req.user

    const pizza = await Pizza.create(req.body);

    res.status(200).json({
        success: true,
        pizza
    })
})

// Get all pizza - ADMIN   =>   /api/admin/rooms
const allAdminPizza = catchAsyncErrors(async (req, res) => {

    const pizza = await Pizza.find();

    res.status(200).json({
        success: true,
        pizza
    })

})

// Get pizza details   =>   /api/pizza/:id
const getSinglePizza = catchAsyncErrors(async (req, res, next) => {

    const pizza = await Pizza.findById(req.query.id);

    if (!pizza) {
        return next(new ErrorHandler('Pizza not found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        pizza
    })
})

// Update pizza details   =>   /api/pizza/:id
const updatePizza = catchAsyncErrors(async (req, res, next) => {

    let pizza = await Pizza.findById(req.query.id);

    if (!pizza) {
        return next(new ErrorHandler('Pizza not found with this ID', 404))
    }

    if (req.body.images) {

        // Delete images associated with the room
        for (let i = 0; i < pizza.images.length; i++) {
            await cloudinary.v2.uploader.destroy(pizza.images[i].public_id)
        }

        let imagesLinks = []
        const images = req.body.images;

        for (let i = 0; i < images.length; i++) {

            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'pizza/pizza',
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })

        }

        req.body.images = imagesLinks;

    }

    pizza = await Pizza.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        pizza
    })

})

// Delete pizza   =>   /api/pizza/:id
const deletePizza = catchAsyncErrors(async (req, res, next) => {

    const pizza = await Pizza.findById(req.query.id);

    if (!pizza) {
        return next(new ErrorHandler('Pizza not found with this ID', 404))
    }

    // Delete images associated with the room
    for (let i = 0; i < pizza.images.length; i++) {
        await cloudinary.v2.uploader.destroy(pizza.images[i].public_id)
    }

    await pizza.remove();

    res.status(200).json({
        success: true,
        message: 'Pizza is deleted.'
    })

})

export {
    newPizza,
    allAdminPizza,
    getSinglePizza,
    updatePizza,
    deletePizza
}