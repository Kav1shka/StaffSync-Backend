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

if (!fs.existsSync('uploads')) {
    console.log("came here 1")
    fs.mkdirSync('uploads');
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("came here 2")
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix);
        console.log("came here 3")
    },
})

const upload = multer({
    
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit to 5MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
            console.log("came here 4")
        } else {
            cb(new Error('Only image files are allowed!'), false);
            console.log("came here 5")
        }
    },
});




router
    .route('/')
    // .post(authentication, restrictTo('1'), createProduct)
    .post(
    (req, res, next) => {
        upload.single('productImage')(req, res, (err) => {
            if (err) {
                console.error('Multer error:', err);
                return res.status(400).json({ error: err.message });
            }
            next();
        });
    },
    createProduct)
    .get(getAllProduct);
    // .get( getAllProduct);

router
    .route('/:id')
    // .get(authentication, restrictTo('1'), getProductById)
    .get(getProductById)
  
    .patch(updateProduct)
    // .patch(authentication, restrictTo('1'), updateProduct)
    .delete(deleteProduct);
    // .delete(authentication, restrictTo('1'), deleteProduct);

module.exports = router;