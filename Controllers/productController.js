const product= require('../db/models/product');
const user = require('../db/models/user');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const createProduct = catchAsync(async (req, res, next) => {
    
    const body = await req.body;
    const userId = req.body.id;
   console.log(body);
   console.log("came here 5")
   if (!body.title || !body.price) {
    return next(new AppError('Title and price are required fields', 400));
}
console.log("came here 6")
    if (!req.file) {
        return next(new AppError('No image file uploaded', 400));
    }
    
    console.log("came here 7")
    
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'products', 
    }).catch((err) => {
        console.error('Cloudinary upload error:', err);
        return next(new AppError('Error uploading image to Cloudinary', 500));
    });
   
    fs.unlinkSync(req.file.path);

    console.log(uploadResult.secure_url);
    console.log("Type of category:", typeof req.body.category);
    console.log("Type of tags:", typeof req.body.tags);

    const parsedCategory = typeof req.body.category === 'string' ? JSON.parse(req.body.category) : req.category;
        const parsedTags = typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags;
        const parsedProductImage = Array.isArray(uploadResult.secure_url) ? uploadResult.secure_url : [uploadResult.secure_url];


        console.log("Type of category:", typeof parsedCategory);
        console.log("Type of tags:", typeof parsedTags);
        console.log("Type of tags:", typeof parsedProductImage);

//     const parsedCategory = Array.isArray(req.category)
//     ? req.category
//     : typeof req.category === 'string'
//     ? JSON.parse(req.category)
//     : [];
// const parsedTags = Array.isArray(req.tags)
//     ? req.tags
//     : typeof req.tags === 'string'
//     ? JSON.parse(req.tags)
//     : [];

    console.log(parsedCategory);
    console.log(parsedTags);
    console.log(req.body.category);
    const newProduct =await product.create({
        id: body.id,
        title: body.title,
        price: body.price,
        shortDescription: body.shortDescription || '',
        description: body.description || '',
        productImage: parsedProductImage,
        // productUrl: body.productUrl|| null,
        category: parsedCategory,
        // category: body.category  ? JSON.parse(body.category) : [],
        tags: parsedTags,
        // tags: body.tags? JSON.parse(body.tags) : [],
        isFeatured:body.isFeatured,
        
    });

    console.log("NN");
    // try {
        // await axios.post('http://localhost:8080/addproduct', {
        //     id:newProduct.id,
        //     title: newProduct.title,
        //     price: newProduct.price,
        // },{ timeout: 300,
        //     headers: { 'Content-Type': 'application/json' },
        // });
        // console.log('Seller agent notified about new product.');
    // } catch (error) {
    //     console.error('Failed to notify seller agent:', error);
    // }

    return res.status(201).json({
        status: 'success',
        data: newProduct ,
    });
});

const getAllProduct = catchAsync(async (req, res, next) => {
    // const userId = req.user.id;
    // console.log(userId);
    const result = await product.findAll({
        // include: user,
        // where: { createdBy: userId }
    });
    return res.json({
        status: 'success',
        data: result,
    });
});

const getProductById = catchAsync(async (req, res, next) => {
    const productId = req.body.id;
    // const result = await product.findByPk(productId, { include: user });
    const result = await product.findByPk(productId);
    if (!result) {
        return next(new AppError('Invalid product id', 400));
    }
    return res.json({
        status: 'success',
        data: result,
    });
});

const updateProduct = catchAsync(async (req, res, next) => {
    // const userId = req.user.id;
    const productId = req.body.id;
    const body = req.body;

    const result = await product.findOne({
        where: { id: productId },
    });

    if (!result) {
        return next(new AppError('Invalid project id', 400));
    }

    result.title = body.title;
    result.productImage = body.productImage;
    result.price = body.price;
    result.shortDescription = body.shortDescription;
    result.description = body.description;
    result.productUrl = body.productUrl;
    result.category = body.category;
    result.tags = body.tags;

    const updatedResult = await result.save();

    return res.json({
        status: 'success',
        data: updatedResult,
    });
});

const deleteProduct = catchAsync(async (req, res, next) => {
    const productId = req.body.id;
    
    const result = await product.findOne({
        where: { id: productId},
    });

    if (!result) {
        return next(new AppError('Invalid product id', 400));
    }

    await result.destroy();

    return res.json({
        status: 'success',
        message: 'Record deleted successfully',
    });
});

module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};