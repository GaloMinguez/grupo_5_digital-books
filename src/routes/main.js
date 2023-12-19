const express = require('express');
const router = express.Router();
const guestCartMiddleware = require('../middlewares/guestCartMiddleware');
const mainController = require('../controllers/mainController');

const upload = require('../middlewares/multer');

router.get('/', mainController.index);

router.get('/products', mainController.productList);

router.get('/products/:id', mainController.productDetail);

router.get('/detail/:id', mainController.detailProduct);

router.get('/productCart', guestCartMiddleware, mainController.productCart);
router.get('/cart', mainController.productCart);

//vista del form d creacion
router.get('/productCreate', mainController.productCreate);
// proceso de creacion produc

let multerWithFields = upload.fields([{ name: 'imgTop', maxCount: 1 }, { name: 'imgBack', maxCount: 1 }])
router.post('/productCreate', multerWithFields, mainController.productSave) 

// mostrar form de edicion del producto
router.get('/productEdit/:id', mainController.productEdit);

// Proceso de actualizacion del producto
router.put('/productEdit/:id', multerWithFields, mainController.productUpDate);

// Proceso de eliminacion del producto
router.delete('/productDelete/:id', mainController.productDelete); 

//router.get('*', mainController.error);


module.exports = router;