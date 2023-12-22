const express = require('express');
const router = express.Router();
const guestCartMiddleware = require('../middlewares/guestCartMiddleware');
const guestDetailMiddleware = require('../middlewares/guestDetailMiddleware');
const mainController = require('../controllers/mainController');

const upload = require('../middlewares/multer');

router.get('/', mainController.index);

router.get('/search', mainController.search); 

router.get('/products', mainController.productList);

router.get('/products/:id', mainController.productDetail);

router.get('/detail/:id', guestDetailMiddleware, mainController.detailProduct);

router.get('/productCart', guestCartMiddleware, mainController.productCart);

//vista del form d creacion
router.get('/productCreate', guestDetailMiddleware, mainController.productCreate);

// proceso de creacion produc
let multerWithFields = upload.fields([{ name: 'imgTop', maxCount: 1 }, { name: 'imgBack', maxCount: 1 }])
router.post('/productCreate', multerWithFields, mainController.productSave) 

// mostrar form de edicion del producto
router.get('/productEdit/:id', guestDetailMiddleware, mainController.productEdit);

// Proceso de actualizacion del producto
router.put('/productEdit/:id', multerWithFields, mainController.productUpDate);

// Proceso de eliminacion del producto
router.delete('/productDelete/:id', guestDetailMiddleware, mainController.productDelete); 


module.exports = router;