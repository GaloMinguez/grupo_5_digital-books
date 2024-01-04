const express = require('express');
const router = express.Router();
const guestCartMiddleware = require('../middlewares/guestCartMiddleware');
const guestDetailMiddleware = require('../middlewares/guestDetailMiddleware');
const mainController = require('../controllers/mainController');

const upload = require('../middlewares/multer');

router.get('/', mainController.index);

router.get('/search', mainController.search); 

router.get('/detail/:id', guestDetailMiddleware, mainController.detailProduct);

router.get('/productCart', guestCartMiddleware, mainController.productCart);

module.exports = router;