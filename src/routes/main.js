const express = require('express');
const router = express.Router();
const guestCartMiddleware = require('../middlewares/guestCartMiddleware');
const guestDetailMiddleware = require('../middlewares/guestDetailMiddleware');
const mainController = require('../controllers/mainController');
const productController = require('../controllers/productController');

const upload = require('../middlewares/multer');

router.get('/', mainController.index);

router.get('/search', mainController.search); 

router.get('/productCart', guestCartMiddleware, mainController.productCart);

router.get('/products', productController.productList);

router.get('/products/:id', productController.productDetail);

router.get('/detail/:id', guestDetailMiddleware, productController.detailProduct);

//vista del form d creacion
router.get('/products/productCreate', guestDetailMiddleware, productController.productCreate);

// proceso de creacion produc
let multerWithFields = upload.fields([{ name: 'imgTop', maxCount: 1 }, { name: 'imgBack', maxCount: 1 }])
router.post('/products/productCreate', multerWithFields, productController.productSave) 

// mostrar form de edicion del producto
router.get('/productEdit/:id', guestDetailMiddleware, productController.productEdit);

// Proceso de actualizacion del producto
router.put('/productEdit/:id', multerWithFields, productController.productUpDate);

// Proceso de eliminacion del producto
router.delete('/products/productDelete/:id', guestDetailMiddleware, productController.productDelete); 


module.exports = router;