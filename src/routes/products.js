const express = require('express');
const router = express.Router();

const uploadFile = require('../middlewares/multerMiddleware');
const guestCartMiddleware = require('../middlewares/guestCartMiddleware');
const guestDetailMiddleware = require('../middlewares/guestDetailMiddleware');
const validationProd = require('../middlewares/validProdMiddleware');

const mainController = require('../controllers/mainController');
const productController = require('../controllers/productController');
const usersController = require('../controllers/userController');

const upload = require('../middlewares/multer');

router.get('/', mainController.index);

router.get('/search', mainController.search); 

router.get('/productCart', guestCartMiddleware, mainController.productCart);

router.get('/products', productController.productList);

router.get('/productAbm', guestDetailMiddleware, productController.productListAbm);

router.get('/products/:id', productController.productDetail);

router.get('/detail/:id', guestDetailMiddleware, productController.detailProduct);

//vista del form d creacion
router.get('/productCreate', guestDetailMiddleware, productController.productCreate);

// proceso de creacion produc
let multerWithFields = upload.fields([{ name: 'imgTop', maxCount: 1 }, { name: 'imgBack', maxCount: 1 }])
router.post('/productCreate', multerWithFields, validationProd, productController.productSave) 

// mostrar form de edicion del producto
router.get('/productEdit/:id', guestDetailMiddleware, productController.productEdit);

// Proceso de actualizacion del producto
router.put('/productEdit/:id', multerWithFields, productController.productUpDate);

// mostrar form de borrado del producto
router.get('/productDelete/:id', guestDetailMiddleware, productController.productDelete); 

// Proceso de eliminacion del producto
router.post('/productDelete/:id', guestDetailMiddleware, productController.productDestroy); 

// mostrar form de edicion del usuario
router.get('/userEdit/:id', guestDetailMiddleware, usersController.userEdit);

// Proceso de actualizacion del usuario
router.post('/userEdit/:id', uploadFile.single('avatar'),usersController.userUpDate);

// mostrar form de borrado del producto
router.get('/userDelete/:id', guestDetailMiddleware, usersController.userDelete); 

// Proceso de eliminacion del producto
router.post('/userDelete/:id', guestDetailMiddleware, usersController.userDestroy); 

//Rutas API
//Listado de todos los productos
router.get('/api/products', productController.listAPI);
//Detalle de un producto en base a un genero indicado
router.get('/api/products/:id', productController.detailAPI);
//Agregar un producto
router.post('/create', productController.createAPI);
//Modificar un producto
router.put('/update/:id', productController.updateAPI);
//Eliminar un producto
router.delete('/delete/:id', productController.destroyAPI);

module.exports = router;