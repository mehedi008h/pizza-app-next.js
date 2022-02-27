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

export {
    newPizza,
    allAdminPizza
}