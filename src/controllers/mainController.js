const libros = require('../data/libros')

const controller = {
    index: (req, res) => res.render('index'),
    register: (req, res) => res.render('../views/users/register'),
    login: (req, res) => res.render('../views/users/login'),
    productDetail: (req, res) => {
        const id = req.params.id;
        const getBook = libros.find(libro => libro.id == id);
        if (getBook) {
            return res.render('../views/products/productDetail', { libros, getBook })
        }
        res.send('El producto no existe');
    },
    productCrud: (req, res) => res.render('../views/products/productCrud'),
    carrito: (req, res) => res.render('../views/products/carrito', { libros }),
    error: (req, res) => res.render('page_404'),
}

module.exports = controller;