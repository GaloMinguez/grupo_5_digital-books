//const libros = require('../data/products.json');
//const now = require("date-now") ver si es necesario o no

const fs = require ('fs');
const path = require('path');

const pathLibros= path.join(__dirname, '../data/products.json');

const libros = JSON.parse(fs.readFileSync(pathLibros, 'utf-8'));

const controller = {
    index: (req, res) => res.render('index'),
    search: (req, res) => {
		palabra = (req.query.keywords).toLowerCase();
		const pFound = libros.some(libro => libro.title.toLowerCase().includes(palabra))
		const pToSearch = libros.filter(libro => libro.title.toLowerCase().includes(palabra));
		res.render('results.ejs', { pToSearch, palabra, pFound });
	},
    detailProduct: (req, res) => {
        const id = req.params.id;
        const getBook = libros.find(libro => libro.id == id);
        if (getBook) {
            return res.render('../views/products/Detailproduct', { libros, getBook })
        }
        res.send('El producto no existe');
    },    
    productCart: (req, res) => res.render('../views/products/productCart', { libros })
    
}

module.exports = controller;