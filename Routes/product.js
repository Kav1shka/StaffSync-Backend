const { authentication, restrictTo } = require('../Controllers/AuthController');
const {
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../Controllers/productController');

const router = require('express').Router();

router
    .route('/')
    // .post(authentication, restrictTo('1'), createProduct)
    .post(createProduct)
    .get(authentication, getAllProduct);
    // .get( getAllProduct);

router
    .route('/:id')
    // .get(authentication, restrictTo('1'), getProductById)
    // .get(getProductById)
    .get(getAllProduct)
    .patch(updateProduct)
    // .patch(authentication, restrictTo('1'), updateProduct)
    .delete(deleteProduct);
    // .delete(authentication, restrictTo('1'), deleteProduct);

module.exports = router;