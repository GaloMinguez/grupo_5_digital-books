const express = require('express');
const router = express.Router();
const guestDetailMiddleware = require('../middlewares/guestDetailMiddleware');
const productController = require('../controllers/productController');

const upload = require('../middlewares/multer');

router.get('/', productController.productList);

router.get('/:id', productController.productDetail);

//router.get('/detail/:id', guestDetailMiddleware, productController.detailProduct);

//vista del form d creacion
router.get('/productCreate', guestDetailMiddleware, productController.productCreate);

// proceso de creacion produc
let multerWithFields = upload.fields([{ name: 'imgTop', maxCount: 1 }, { name: 'imgBack', maxCount: 1 }])
router.post('/productCreate', multerWithFields, productController.productSave) 

// mostrar form de edicion del producto
router.get('/productEdit/:id', guestDetailMiddleware, productController.productEdit);

// Proceso de actualizacion del producto
router.put('/productEdit/:id', multerWithFields, productController.productUpDate);

// Proceso de eliminacion del producto
router.delete('/productDelete/:id', guestDetailMiddleware, productController.productDelete); 


module.exports = router;