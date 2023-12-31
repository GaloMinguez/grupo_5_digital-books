//const libros = require('../data/products.json');
//const now = require("date-now") ver si es necesario o no

const fs = require ('fs');
const path = require('path');
const { log } = require('console');

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
    productList: (req, res) => res.render('../views/products/productList', { libros }),    
    productDetail: (req, res) => {
        const id = req.params.id;
        const getBook = libros.find(libro => libro.id == id);
        if (getBook) {
            return res.render('../views/products/productDetail', { libros, getBook })
        }
        res.send('El producto no existe');
    },
    detailProduct: (req, res) => {
        const id = req.params.id;
        const getBook = libros.find(libro => libro.id == id);
        if (getBook) {
            return res.render('../views/products/Detailproduct', { libros, getBook })
        }
        res.send('El producto no existe');
    },
     
    productCart: (req, res) => res.render('../views/products/productCart', { libros }),

    //get form
    productCreate: (req, res) => {
		res.render('../views/products/productCreate.ejs')
	},

    // post form
    productSave: (req,res)=>{
        const libroNuevo = {
            id : libros.length + 1,
            //id: Date.now(),
            imgTop: req.files.imgTop[0].filename || 'default.png',
            imgBack: req.files.imgBack[0].filename || 'default.png',
            ...req.body
        }
        libros.push(libroNuevo)
        // convertir a json
        let listaLibrosJSON = JSON.stringify(libros, null, ' ')
        // escribir el json
        fs.writeFileSync(pathLibros, listaLibrosJSON)
        // redireccionamos a home
        res.redirect('/')
    },

    productEdit:  (req, res) => {
        const id = req.params.id
        const libro = libros.find(libro => libro.id == id)
        if(libro){
            res.render('../views/products/productEdit', { libro: libro })
        }
        res.send('El libro que quieres editar no existe')
    },
   
    productUpDate: (req, res) => {
        const { id } = req.params
        const { title, author,genre,description,descriptionD,price,discount} = req.body

        const productoAEditar = libros.find(libro => libro.id == id)
        
        productoAEditar.title = title || productoAEditar.title
        productoAEditar.author = author || productoAEditar.author
        productoAEditar.description = description || productoAEditar.description
        productoAEditar.descriptionD = descriptionD || productoAEditar.descriptionD
        productoAEditar.price = price || productoAEditar.price
        productoAEditar.discount = discount || productoAEditar.discount
        
        console.log(req.files);
        if (!req.files){
            productoAEditar.imgTop = req.files ? req.files.imgTop[0].filename : productoAEditar.imgTop
            productoAEditar.imgBack = req.files ? req.files.imgBack[0].filename : productoAEditar.imgBack
        }
        
        fs.writeFileSync(pathLibros, JSON.stringify(libros, null, ' '))

        res.redirect('/')
    },
    
    productDelete: (req, res) => {
		const id = req.params.id
		productToDelete = libros.find(libro => libro.id == id)
		const pToDelete = libros.filter(libro => libro.id != req.params.id)
		fs.writeFileSync(pathLibros, JSON.stringify(pToDelete, null, ' '))
		fs.unlinkSync(path.join(__dirname, '../public/img', productToDelete.imgTop))
        fs.unlinkSync(path.join(__dirname, '../public/img', productToDelete.imgBack))
		res.redirect('/')
    }
    
}

module.exports = controller;