const multer = require('multer');
const fs = require('fs');
const { authentication, restrictTo } = require('../Controllers/AuthController');
const {
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../Controllers/productController');

const router = require('express').Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix);
    },
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
});

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

router
    .route('/')
    // .post(authentication, restrictTo('1'), createProduct)
    .post(upload.single('productImage'), createProduct)
    .get(getAllProduct);
    // .get( getAllProduct);

router
    .route('/:id')
    // .get(authentication, restrictTo('1'), getProductById)
    // .get(getProductById)
  
    .patch(updateProduct)
    // .patch(authentication, restrictTo('1'), updateProduct)
    .delete(deleteProduct);
    // .delete(authentication, restrictTo('1'), deleteProduct);

module.exports = router;