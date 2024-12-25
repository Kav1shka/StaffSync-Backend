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