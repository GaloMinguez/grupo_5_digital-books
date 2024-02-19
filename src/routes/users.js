const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/userController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const validLogin = require('../middlewares/validLoginMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const guestDetailMiddleware = require('../middlewares/guestDetailMiddleware');

// Formulario de registro Cliente
router.get('/register', guestMiddleware, usersController.register);

// Procesar el registro Cliente
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, usersController.login);

// Procesar el login
router.post('/login', validLogin, usersController.loginProcess);

// Perfil de Usuario
router.get('/profile', authMiddleware, usersController.profile);

// Logout
router.get('/logout', usersController.logout);

// Listar usuarios
router.get('/userList', guestDetailMiddleware, usersController.userListAbm);

// mostrar form de edicion del usuario
//router.get('/userEdit/:id', guestDetailMiddleware, usersController.userEdit);

// Proceso de actualizacion del usuario
//router.put('/userEdit/:id', uploadFile.single('avatar'), usersController.userUpDate);

module.exports = router;