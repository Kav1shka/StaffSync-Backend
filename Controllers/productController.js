const product= require('../db/models/product');
const user = require('../db/models/user');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');


const createProduct = catchAsync(async (req, res, next) => {
    
    const body = await req.body;
    const userId = req.body.id;
   console.log(body);

   if (!body.title || !body.price) {
    return next(new AppError('Title and price are required fields', 400));
}

    if (!req.files || !req.files.productImage) {
        return next(new AppError('No image file uploaded', 400));
    }

    const file = req.files.productImage; 
    const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'products', 
    });

    fs.unlinkSync(filePath);

    const newProduct =await product.create({
        id: body.id,
        title: body.title,
        price: body.price,
        shortDescription: body.shortDescription || '',
        description: body.description || '',
        productImage: uploadResult.secure_url,
        productUrl: body.productUrl|| null,
        category: body.category  ? JSON.parse(body.category) : [],
        tags: body.tags? JSON.parse(body.tags) : [],
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
    createProduct: [upload.single('productImage'), createProduct],
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};