const libros = require('../data/products.json')

const controller = {
    index: (req, res) => res.render('index'),
    register: (req, res) => res.render('../views/users/register'),
    login: (req, res) => res.render('../views/users/login'),
    productList: (req, res) => res.render('../views/products/productList', { libros }),    
    productDetail: (req, res) => {
        const id = req.params.id;
        const getBook = libros.find(libro => libro.id == id);
        if (getBook) {
            return res.render('../views/products/productDetail', { libros, getBook })
        }
        res.send('El producto no existe');
    },
    productCrud: (req, res) => res.render('../views/products/productCrud'),
    productCart: (req, res) => res.render('../views/products/productCart', { libros }),
    productDelete: (req, res) => {
        const id = req.params.id;
        const index = libros.findIndex(libro => libro.id == id);
        if (index !== -1) {
            libros.splice(index, 1);
            saveDataToFile();
            res.redirect('index');
        } else {
            res.send('El producto no existe');
        }
    },
    error: (req, res) => res.render('page_404'),
    
}

module.exports = controller;